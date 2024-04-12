import sensors from '../module/sensorsdata.min';
import { globalData } from '../settings';
import { wxLogin } from './useBase';
import { zdmallInfo } from './useStorage';
export let isRegisterSensors = false;
export async function sensorsInit() {
  zdmallInfo.scene = wx.getLaunchOptionsSync().scene;
  try {
    zdmallInfo.accessToken = '';
    await wxLogin();
  } catch (error) {}
  if (!globalData.sensorsPush) {
    isRegisterSensors = true;
    getApp().sensors = null;
    return;
  }
  sensors.setPara({
    name: 'sensors',
    server_url: globalData.sensorsPushUrl,
    autoTrack: {
      appLaunch: true,
      appShow: true,
      appHide: true,
      pageShow: true,
      pageShare: true,
      mpClick: true,
      mpFavorite: true,
      pageLeave: true
    },
    source_channel: [],
    show_log: true,
    allow_amend_share_path: true
  });
  isRegisterSensors = true;
  if (zdmallInfo.userInfo.openId)
    sensors.setOpenid(zdmallInfo.userInfo.openId);
  if (zdmallInfo.userInfo.unionId)
    sensors.login(zdmallInfo.userInfo.unionId);
  sensors.registerApp({
    product_name: globalData.sensorPushName
  });
  sensors.init();
}
