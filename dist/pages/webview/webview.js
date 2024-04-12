import { useArgsObj, useArgsUrl, useValidateArgs } from '../../hooks/useArgs';
import { useBase } from '../../hooks/useBase';
import { useDynamicData, useStaticData } from '../../hooks/useData';
import { useTimeStamp } from '../../hooks/useDate';
import { useSharePath } from '../../hooks/useShare';
import { zdmallInfo } from '../../hooks/useStorage';
import { useRandomString } from '../../hooks/useString';
import { isHaveValue } from '../../hooks/useValidate';
import sha1 from '../../module/sha1.js';
import { globalData } from '../../settings';
Page({
  data: {
    ...useStaticData,
    src: '',
    shareTitle: '',
    shareCover: '',
    message: {
      shareUrl: ''
    }
  },
  onLoad() {
    this.setData({
      ...useDynamicData()
    });
    useBase.init({
      needLogin: false
    });
  },
  async reLoad(event) {
    await useBase.initPage.call(this, {
      needLogin: false
    }, event);
    let src = await useValidateArgs.call(this, 'src');
    const shareTitle = await useValidateArgs.call(this, 'shareTitle', false);
    const shareCover = await useValidateArgs.call(this, 'shareCover', false);
    if (!src) {
      this.setData({
        loading: false,
        notfound: true
      });
      return;
    }
    src = decodeURIComponent(src);
    if (src.startsWith('udesk:')) {
      wx.hideShareMenu();
      src = src.replace(/udesk:/g, '');
      const timestamp = useTimeStamp();
      const nonce = useRandomString();
      const web_token = zdmallInfo.userInfo.unionId;
      const signStr = `nonce=${nonce}&timestamp=${timestamp}&web_token=${web_token}&${globalData.udeskKey}`;
      const signature = sha1(signStr).toUpperCase();
      const obj = {
        c_name: zdmallInfo.userInfo.nickName || `游客${zdmallInfo.userInfo.openId}`,
        c_phone: zdmallInfo.userInfo.mobile || '',
        nonce,
        timestamp,
        web_token,
        signature,
        c_cf_dialogueDesc: `appNo=${globalData.udeskAppNo},openId=${zdmallInfo.userInfo.openId}`,
        c_cf_appNo: globalData.udeskAppNo,
        c_cf_openId: zdmallInfo.userInfo.openId
      };
      const parmras = Object.entries(obj).reduce((value, item) => {
        return value + `&${item[0]}=${encodeURIComponent(item[1])}`;
      }, '');
      src += parmras;
    }
    this.setData({
      src: decodeURIComponent(src),
      shareTitle: decodeURIComponent(shareTitle || ''),
      shareCover: decodeURIComponent(shareCover || ''),
      loading: false
    });
  },
  handleMessage(e) {
    const { detail } = e;
    const data = detail.data.pop();
    if (data.shareTitle) {
      this.setData({
        shareTitle: data.shareTitle
      });
    }
    Reflect.deleteProperty(data, 'shareTitle');
    if (data.shareCover) {
      this.setData({
        shareCover: data.shareCover
      });
    }
    Reflect.deleteProperty(data, 'shareCover');
    this.setData({
      message: data
    });
  },
  onShareAppMessage({ from }) {
    let { shareTitle: title, imageUrl } = globalData;
    if (this.data.shareTitle)
      title = this.data.shareTitle;
    if (this.data.shareCover)
      imageUrl = this.data.shareCover;
    let jumpUrl = '';
    let { src } = this.data;
    const { message } = this.data;
    if (typeof message.shareUrl === 'string' && isHaveValue(message.shareUrl))
      src = message.shareUrl;
    const index = src.lastIndexOf('?');
    if (index !== -1) {
      const frontPath = src.substring(0, index);
      const endPath = src.substring(index);
      const [objPath, hash] = endPath.split('#');
      let obj = useArgsUrl(objPath);
      Reflect.deleteProperty(obj, 'accessToken');
      Reflect.deleteProperty(obj, 'shareId');
      Reflect.deleteProperty(obj, 'distinctID');
      Reflect.deleteProperty(obj, 'RegisterSource');
      Reflect.deleteProperty(obj, 'scene');
      if (zdmallInfo.userInfo.openId)
        obj.shareId = zdmallInfo.userInfo.openId;
      obj = Object.assign(obj, message);
      Reflect.deleteProperty(obj, 'shareUrl');
      const url = useArgsObj(obj);
      jumpUrl = frontPath;
      if (url)
        jumpUrl += '?' + url;
      if (hash)
        jumpUrl += `#${hash}`;
    } else {
      jumpUrl = src;
      if (zdmallInfo.userInfo.openId)
        jumpUrl += `?shareId=${zdmallInfo.userInfo.openId}&shareid=${zdmallInfo.userInfo.openId}`;
    }
    let path = `/pages/jump/jump?path=${encodeURIComponent(jumpUrl)}`;
    if (this.data.shareTitle)
      path += `&shareTitle=${encodeURIComponent(this.data.shareTitle)}`;
    if (this.data.shareCover)
      path += `&shareCover=${encodeURIComponent(this.data.shareCover)}`;
    path = useSharePath(path, from);
    return {
      title,
      imageUrl,
      path
    };
  }
});
