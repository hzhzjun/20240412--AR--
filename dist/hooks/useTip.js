import { useStorage } from './useStorage';
export function useShowToast(options) {
  const opt = Object.assign({
    icon: 'none',
    duration: 2000
  }, options);
  if (useStorage.showLoading || false) {
    useHideLoading({}, () => {
      wx.showToast(opt);
    });
    return;
  }
  wx.showToast(opt);
}
export function useShowLoading(options) {
  const opt = Object.assign({
    mask: true
  }, options);
  if (useStorage.showLoading || false) {
    useHideLoading({}, () => {
      useStorage.showLoading = true;
      wx.showLoading(opt);
    });
    return;
  }
  useStorage.showLoading = true;
  wx.showLoading(opt);
}
export function useHideLoading(options = {}, callback) {
  if (!(useStorage.showLoading || false))
    return;
  useStorage.showLoading = false;
  if (callback) {
    options.complete = () => {
      callback();
    };
  }
  wx.hideLoading(options);
}
