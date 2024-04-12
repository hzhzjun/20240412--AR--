import { useValidateArgs } from '../../hooks/useArgs';
import { useBase } from '../../hooks/useBase';
import { useDynamicData, useStaticData } from '../../hooks/useData';
import { navigateTo, redirectTo } from '../../hooks/useRouter';
import { useSensors } from '../../hooks/useSensors';
import { useSharePath } from '../../hooks/useShare';
import { zdmallInfo } from '../../hooks/useStorage';
import { globalData } from '../../settings';
const loginConfig = {
  needLogin: true
};
Page({
  data: {
    ...useStaticData,
    path: '',
    shareTitle: '',
    shareCover: ''
  },
  async onLoad() {
    this.setData({
      ...useDynamicData(),
      authFullScreen: true
    });
    const needLogin = await useValidateArgs.call(this, 'needLogin', false);
    loginConfig.needLogin = typeof needLogin === 'undefined' || Number(needLogin) === 1 || false;
    useBase.init(loginConfig);
  },
  async reLoad(event) {
    await useBase.initPage.call(this, loginConfig, event);
    const path = decodeURIComponent((await useValidateArgs.call(this, 'path')) || '');
    const shareTitle = await useValidateArgs.call(this, 'shareTitle', false);
    const shareCover = await useValidateArgs.call(this, 'shareCover', false);
    this.setData({
      path: decodeURIComponent(path),
      shareTitle: decodeURIComponent(shareTitle || ''),
      shareCover: decodeURIComponent(shareCover || '')
    });
    let url = '';
    if (path.startsWith('http')) {
      let appendPath = '';
      if (zdmallInfo.accessToken)
        appendPath = `accessToken=${zdmallInfo.accessToken}`;
      const distinctID = useSensors.getDistinctID();
      if (distinctID) {
        appendPath += appendPath === '' ? '' : '&';
        appendPath += `distinctID=${distinctID}`;
      }
      if (zdmallInfo.scene)
        appendPath += `&scene=${zdmallInfo.scene}`;
      if (zdmallInfo.registerSource)
        appendPath += `&RegisterSource=${zdmallInfo.registerSource}`;
      let jumpUrl = '';
      const index = path.lastIndexOf('?');
      if (index !== -1) {
        const frontPath = path.substring(0, index);
        const endPath = path.substring(index + 1);
        jumpUrl = `${frontPath}?${appendPath}&${endPath}`;
      } else
        jumpUrl = `${path}?${appendPath}`;
      url = `/pages/webview/webview?src=${encodeURIComponent(jumpUrl)}`;
      if (shareTitle)
        url += `&shareTitle=${shareTitle}`;
      if (shareCover)
        url += `&shareCover=${shareCover}`;
    } else
      url = path;
    try {
      redirectTo({
        url
      });
    } catch (error) {
      navigateTo({
        url
      });
    }
  },
  onShareAppMessage({ from }) {
    let { shareTitle: title, imageUrl } = globalData;
    if (this.data.shareTitle)
      title = this.data.shareTitle;
    if (this.data.shareCover)
      imageUrl = this.data.shareCover;
    let path = `/pages/jump/jump?path=${encodeURIComponent(this.data.path)}`;
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
