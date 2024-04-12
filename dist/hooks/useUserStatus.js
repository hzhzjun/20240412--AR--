import { useTimeStamp } from './useDate';
import { zdmallInfo } from './useStorage';
export function isHaveKey() {
  return Boolean(zdmallInfo.userInfo.openId && zdmallInfo.userInfo.unionId);
}
export function isRegisterKey() {
  const timeStamp = useTimeStamp();
  if (!zdmallInfo.registerKey || !zdmallInfo.registerKeyTimeStamp)
    return false;
  return timeStamp - zdmallInfo.registerKeyTimeStamp <= 1000 * 60 * 5;
}
export function isLogin() {
  return Boolean(zdmallInfo.accessToken);
}
export function getLoginStatus() {
  return new Promise(resolve => {
    const timer = setInterval(() => {
      if (!zdmallInfo.loginStatus) {
        clearInterval(timer);
        return resolve();
      }
    }, 100);
  });
}
