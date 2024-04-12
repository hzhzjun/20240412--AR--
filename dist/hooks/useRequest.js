import { globalData } from '../settings';
import { useBase, wxLogin } from './useBase';
import { getCurrentPagesList, getThePage } from './useRouter';
import { zdmallInfo } from './useStorage';
import { useHideLoading, useShowToast } from './useTip';
import { getLoginStatus, isLogin } from './useUserStatus';
let isReLogin = false;
export class useRequest {
  request({ url, data = {}, method = 'POST', header, needLogin = false, showToast = true, module = 'base' }) {
    return new Promise(async (resolve, reject) => {
      if (url.includes('.json'))
        method = 'GET';
      try {
        if (needLogin && !isLogin() && zdmallInfo.loginStatus)
          await getLoginStatus();
        else if (needLogin && !isLogin() && !zdmallInfo.loginStatus) {
          await useBase.login(true);
        }
        this._request(url, data, method, header, resolve, reject, showToast, module);
      } catch (error) {
        reject();
      }
    });
  }
  getApiBaseUrl(url, module) {
    return url && url.includes('.json') && globalData.env === 'dev' ?
      globalData[globalData.env].host + url :
      (module === 'oauth2' ? globalData[globalData.env].openBaseUrl : globalData[globalData.env]?.apiBaseUrl) + url;
  }
  getHeader() {
    const header = {};
    const { accessToken } = zdmallInfo;
    accessToken && (header['access-token'] = accessToken);
    header['tenant-id'] = globalData.tenantId;
    return header;
  }
  async _request(url, data = {}, method, header, resolve, reject, showToast, module = 'base') {
    wx.request({
      url: this.getApiBaseUrl(url, module),
      method,
      data,
      header: {
        'content-type': 'application/json',
        ...Object.assign(this.getHeader(), header)
      },
      success: res => {
        this.success(res, resolve, reject, showToast);
      },
      fail: () => {
        reject();
        this._showError('网络错误，请重试', showToast);
      }
    });
  }
  async logout() {
    useHideLoading();
    zdmallInfo.accessToken = '';
    zdmallInfo.userInfo = {};
    try {
      zdmallInfo.loginStatus = true;
      await useBase.login(true);
      zdmallInfo.loginStatus = false;
      zdmallInfo.isRefresh = false;
    } catch (error) {
      zdmallInfo.loginStatus = false;
      globalData.login = false;
      const thePage = getThePage();
      thePage.setData({
        login: false
      });
      getCurrentPagesList().forEach(item => {
        item.setData({
          login: false
        });
      });
      thePage.reLoad();
      useShowToast({
        title: '登录已失效，请重新登录'
      });
    }
  }
  async success(res, resolve, reject, showToast) {
    const data = res.data;
    if (res.statusCode !== 200)
      return reject('连接失败，请检查网络');
    if (data.status === true || data.success === true)
      resolve(data);
    else {
      try {
        if (data.error.code === 401) {
          if (isLogin() && !isReLogin) {
            zdmallInfo.accessToken = '';
            isReLogin = true;
            await wxLogin();
            getThePage().reLoad();
            isReLogin = false;
            return reject(data);
          } else {
            zdmallInfo.accessToken = '';
            zdmallInfo.userInfo = {};
          }
          return reject(data);
        } else if (data.error.code === 404)
          return reject(data);
        else {
          this._showError(data.error, showToast);
          return reject(data);
        }
      } catch (error) {
        return reject('未知原因导致的请求失败');
      }
    }
  }
  _showError(error, showToast) {
    if (!showToast)
      return;
    const title = typeof error === 'string' ? error : error ? error.msg : '';
    useShowToast({
      title: title || '连接失败，请检查网络'
    });
  }
}
