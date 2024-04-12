import { globalData } from '../settings';
export const sr = require('../module/sr-sdk-wxapp.js');
export const youshuInit = () => {
  if (globalData.youshuPush) {
    sr.init({
      token: globalData.youshuToken,
      appid: globalData.appid,
      usePlugin: false,
      debug: false,
      autoProxy: true
    });
  }
};
