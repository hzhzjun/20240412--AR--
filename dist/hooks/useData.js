import { globalData } from '../settings';
import { isLogin } from './useUserStatus';

export const topPosition = globalData.navigationStyle === 'default' ? 0 : 44 + globalData.systemInfo.statusBarHeight;

export const useStaticData = {
  opacity: 1,
  background: true,
  loading: true,
  fail: false,
  busy: false,
  showModal: false,
  modalList: {},
  login: globalData.login || isLogin(),
  notfound: false,
  hasOnShow: false,
  homePath: globalData.homePath,
  authFullScreen: false,
  notFoundTitle: '信息已经找不到啦~',
  contact: globalData.contact,
  notFoundType: 'normal',
  pageName: '',
  appName: globalData.appName
};
export function useDynamicData() {
  return {
    login: globalData.login || isLogin()
  };
}
