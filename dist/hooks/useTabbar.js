import { globalData } from '../settings';
import { isTabBar } from './useRouter';
export function useTabBar() {
  return typeof this.getTabBar === 'function' ? this.getTabBar() : null;
}
export function useHideTabBar() {
  if (isTabBar()) {
    if (!globalData.isCustomTabbar) {
      wx.hideTabBar({
        animation: true
      });
    } else {
      const tabbar = useTabBar.call(this);
      tabbar && tabbar.hide();
    }
  }
}
export function useShowTabBar() {
  if (isTabBar()) {
    if (!globalData.isCustomTabbar) {
      wx.showTabBar({
        animation: true
      });
    } else {
      const tabbar = useTabBar.call(this);
      tabbar && tabbar.show();
    }
  }
}
