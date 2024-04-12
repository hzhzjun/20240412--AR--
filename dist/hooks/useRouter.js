import { globalData } from '../settings';
export const tabBar = globalData.tabBar;
export function isTabBar(url) {
  if (!url && getThePage())
    url = getThePage().route;
  if (!url)
    return false;
  url = url.split('?')[0];
  url.startsWith('/') && (url = url.substring(1));
  return tabBar.findIndex(item => item.pagePath === url) > -1;
}
export function getCurrentPagesList() {
  return getCurrentPages().filter(item => Boolean(item));
}
export function getThePage(index = 0) {
  const Pages = getCurrentPagesList();
  return Pages[Pages.length - 1 + index];
}
export function navigateBack(options, url) {
  if (!options || !options.delta) {
    const Pages = getCurrentPagesList();
    if (url) {
      if (url.startsWith('/'))
        url = url.substring(1, url.length);
      const index = Pages.findIndex(item => item.route === url);
      options = {
        delta: Pages.length - index - 1
      };
    } else if (Pages.length === 1) {
      reLaunch({
        url: globalData.homePath
      });
      return;
    }
  }
  wx.navigateBack(options);
}
export function navigateTo(options) {
  options.url = getRightUrl(options.url);
  if (isTabBar(options.url))
    wx.switchTab(options);
  else
    wx.navigateTo(options);
}
export function reLaunch(options) {
  options.url = getRightUrl(options.url);
  wx.reLaunch(options);
}
export function redirectTo(options) {
  options.url = getRightUrl(options.url);
  if (isTabBar(options.url))
    throw new Error('不允许跳转到 tabbar 页面，请使用navigateTo');
  wx.redirectTo(options);
}
export function getRightUrl(url) {
  url = url.trim();
  if (!url.startsWith('/'))
    url = `/${url}`;
  return url;
}
export async function jumpPage(data) {
  let path = '';
  if (!data.target) {
    return;
  }
  switch (data.target) {
    case '_udesk':
      path = `/pages/webview/webview?src=${encodeURIComponent(`udesk:${globalData.udeskUrl}&group_id=${data.groupId || ''}`)}`;
      break;
    case '_udesk_card':
      path = `/pages/webview/webview?src=${encodeURIComponent(`udesk:${globalData.udeskCardUrl}&group_id=${data.groupId || ''}`)}`;
      break;
  }
  navigateTo({
    url: path
  });
}
