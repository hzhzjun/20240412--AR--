import { globalData } from '../../settings';
var AppList;
(function(AppList) {
  AppList["tx"] = "\u817E\u8BAF\u89C6\u9891";
  AppList["txnews"] = "\u817E\u8BAF\u65B0\u95FB";
  AppList["iqiyi"] = "\u7231\u5947\u827A";
})(AppList || (AppList = {}));
Component({
  properties: {},
  data: {
    query: {},
    scene: 0,
    showReturnApp: globalData.showReturnApp
  },
  pageLifetimes: {
    show() {
      const { query, scene } = wx.getLaunchOptionsSync();
      for (const key in query) {
        query[key] = decodeURIComponent(query[key]);
      }
      const utm_source = query.utm_source;
      query.back_name = AppList[utm_source];
      this.setData({
        query,
        scene,
        showReturnApp: globalData.showReturnApp
      });
    }
  },
  methods: {
    handleCloseButton() {
      this.setData({
        showReturnApp: false
      });
      globalData.showReturnApp = false;
    }
  }
});
