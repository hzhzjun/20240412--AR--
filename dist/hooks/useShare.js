import { globalData } from '../settings';
import { useArgsObj } from './useArgs';
import { zdmallInfo } from './useStorage';
export var ShareMode;
(function(ShareMode) {
  ShareMode[ShareMode["\u9ED8\u8BA4\u5206\u4EAB"] = 1] = "\u9ED8\u8BA4\u5206\u4EAB";
  ShareMode[ShareMode["\u5468\u671F\u5361\u5206\u4EAB"] = 2] = "\u5468\u671F\u5361\u5206\u4EAB";
})(ShareMode || (ShareMode = {}));
export function useSharePath(url, from) {
  const path = `${globalData.homePath}?page=${encodeURIComponent(url)}`;
  return pushData(path, from);
}

function pushData(path, from) {
  const obj = {};
  if ((from === 'button' || globalData.enableShare) && zdmallInfo.userInfo.openId)
    obj.shareid = zdmallInfo.userInfo.openId;
  if (zdmallInfo.userInfo.openId)
    obj.channel = 'message';
  const registerSource = useRegisterSource();
  if (registerSource)
    obj.RegisterSource = registerSource;
  path += path.indexOf('?') === -1 ? '?' : '&';
  path += useArgsObj(obj);
  if (path.endsWith('?') || path.endsWith('&'))
    path = path.substring(0, path.length - 1);
  return path;
}
