const settings = {
  systemInfo: wx.getSystemInfoSync(),
  menuButton: wx.getMenuButtonBoundingClientRect(),
  callback: () => {},
  login: false,
  serviceTel: '',
  subscribeTemplate: [],
  logined: false,
  levelList: [],
  currentInfo: {
    currentLevel: -1,
    totalGrowth: 0
  },
  RealtimeLogManager: null,
  thirdApp: null,
  tabbar: null,
  env: 'uat'
};
const extJson = wx.getExtConfigSync();
export const globalData = {
  ...settings,
  ...extJson,
  dev: {
    host: 'http://127.0.0.1:5500/json',
    apiBaseUrl: 'https://msmarket-uat.dctest.digitalyili.com/gateway/api',
    openBaseUrl: 'https://msmarket-uat.dctest.digitalyili.com/developer',
    storagePrefix: 'dev_'
  },
  prod: {
    apiBaseUrl: 'https://msmarket.msx.digitalyili.com/gateway/api',
    openBaseUrl: 'https://msmarket.msx.digitalyili.com/developer',
    storagePrefix: 'prod_'
  }
};
