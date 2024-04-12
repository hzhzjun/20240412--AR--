import { login } from '../api/auth/account';
import { getWxcodeValue } from '../api/commons/common';
import { globalData } from '../settings';
import { useArgsUrl } from './useArgs';
import { useTimeStamp } from './useDate';
import { useClone, useValue } from './useObject';
import { getCurrentPagesList, getThePage } from './useRouter';
import { isRegisterSensors } from './useSensors';
import { zdmallInfo } from './useStorage';
import { isLogin } from './useUserStatus';
import { isCode } from './useValidate';

export const useBase = {
  Pages: [],
  Page: {},
  needLogin: false,
  async init(loginConfig) {
    this.needLogin = loginConfig.needLogin || false;
    this.Pages = getCurrentPagesList();
    this.Page = getThePage();
    this.Page.setData({
      needLogin: this.needLogin
    });
    const res = wx.getLaunchOptionsSync();
    const { query } = res;
    if (query.scene && isCode(query.scene)) {
      const { data: parameter } = await getWxcodeValue(query.scene);
      const obj = useArgsUrl('?' + parameter);
      Reflect.deleteProperty(query, 'scene');
      Reflect.set(res, 'query', obj);
      this.Page.options = Object.assign(this.Page.options, obj);
    }
    if (this.Page.options.scene && isCode(this.Page.options.scene)) {
      const { data: parameter } = await getWxcodeValue(this.Page.options.scene);
      const obj = useArgsUrl('?' + parameter);
      Reflect.deleteProperty(this.Page.options, 'scene');
      Reflect.set(res, 'query', obj);
      this.Page.options = Object.assign(this.Page.options, obj);
    }
    if (query.scene && !isCode(query.scene)) {
      const scene = decodeURIComponent(query.scene);
      const obj = useArgsUrl('?' + scene);
      Reflect.deleteProperty(query, 'scene');
      this.Page.options = Object.assign(this.Page.options, obj);
    }
    if (this.Page.options.scene && !isCode(this.Page.options.scene)) {
      const scene = decodeURIComponent(this.Page.options.scene);
      const obj = useArgsUrl('?' + scene);
      Reflect.deleteProperty(this.Page.options, 'scene');
      this.Page.options = Object.assign(this.Page.options, obj);
    }
    globalData.login = isLogin();
    this.Pages.forEach(item => {
      item.data.login = globalData.login;
    });
    globalData.logined = true;
    if (this.needLogin) {
      if (globalData.login) {
        this.Page.reLoad(loginConfig);
        return;
      }
      try {
        await this.login(true);
        this.Page.reLoad(loginConfig);
      } catch (error) {
        this.Page.setData({
          loading: false,
          fail: true,
          failContent: '当前页面需要登录，请授权登录！',
          failButtonContent: '前往登录'
        });
      }
    } else {
      if (!globalData.login)
        await this.login(false);
      this.Page.reLoad(loginConfig);
    }
  },
  initPage(loginConfig, event) {
    return new Promise((resolve, reject) => {
      const that = this;
      that.setData({
        failContent: '',
        failButtonContent: ''
      });
      if (event) {
        that.setData({
          loading: true,
          fail: false
        });
      }
      if (loginConfig.needLogin && !that.data.login) {
        globalData.callback = () => {};
        useBase.init(loginConfig);
        that.setData({
          loading: false,
          fail: true
        });
        reject();
      } else
        resolve();
    });
  },
  login(must) {
    return new Promise(async (resolve, reject) => {
      try {
        await getThePage().selectComponent('#auth').auth(must);
        if (isLogin()) {
          globalData.login = true;
          getCurrentPagesList().forEach(item => item.setData({
            login: true
          }));
          if (globalData.callback) {
            globalData.callback();
            globalData.callback = () => {};
          }
        }
        resolve();
      } catch (error) {
        if (must)
          reject(Error('登录失败'));
        else
          resolve();
      }
    });
  }
};
let busy = false;
export function wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: async (res) => {
        if (busy)
          return;
        busy = true;
        try {
          const { data } = await login({ jsCode: res.code });
          const userInfo = useClone(zdmallInfo.userInfo);
          Object.assign(zdmallInfo, useValue(data));
          Object.assign(zdmallInfo.userInfo, userInfo, useValue(data.userInfo));
          resolve();
        } catch (error) {
          reject();
        }
        busy = false;
      },
      fail() {
        reject();
      }
    });
  });
}
export function isComplete() {
  const time1 = useTimeStamp();
  return new Promise(resolve => {
    const interval = setInterval(() => {
      const time2 = useTimeStamp();
      if (time2 - time1 > 1000 * 5) {
        clearInterval(interval);
        return resolve(false);
      }
      if (isRegisterSensors) {
        clearInterval(interval);
        resolve(true);
      }
    }, 5);
  });
}
