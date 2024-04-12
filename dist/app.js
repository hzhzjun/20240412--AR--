import { getAuthorizationCode, getDefaultAddress, getLocation, getMemberStatus, getWxcodeImage, getWxcodeOptions, goUdeskContact } from './hooks/useMoudle';
import { usePageNotFound } from './hooks/useRouter';
import { sensorsInit } from './hooks/useSensors';
import { sr, youshuInit } from './hooks/useYoushu';
import { globalData } from './settings';
sensorsInit();
youshuInit();
App({
  onLaunch() {},
  onShow() {},
  onHide() {},
  onError() {},
  onPageNotFound(options) {
    usePageNotFound(options);
  },
  sr: globalData.youshuPush ? sr : undefined,
  getWxcodeImage,
  getWxcodeOptions,
  getMemberStatus,
  getLocation,
  goUdeskContact,
  getDefaultAddress,
  getAuthorizationCode,
  env: globalData.env,
  tenantId: globalData.tenantId,
  tabBar: globalData.tabBar,
  version: globalData.version
});
