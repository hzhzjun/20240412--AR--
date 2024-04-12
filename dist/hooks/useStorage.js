import { getSystemTime } from '../api/commons/common';
import { decode, encode } from '../module/base64.js';
import { globalData } from '../settings';
import { useTimeStamp } from './useDate';

function useSetStorageSync(key, data) {
  data = JSON.stringify(data);
  if (globalData.env !== 'dev')
    data = encode(data);
  wx.setStorageSync(`${globalData[globalData.env]?.storagePrefix}${key}`, data);
}

function useGetStorageSync(key) {
  let data = wx.getStorageSync(`${globalData[globalData.env]?.storagePrefix}${key}`) || '';
  if (globalData.env !== 'dev')
    data = decode(data);
  return JSON.parse(data || 'null');
}
class ZdmallInfo {
  constructor() {}
  static instance = getZdmallInfo();
}
export const zdmallInfo = new Proxy(ZdmallInfo.instance, {
  get(target, key) {
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    Reflect.set(target, key, value);
    setZdmallInfo(target);
    return true;
  }
});

function getZdmallInfo() {
  let zdmallInfo = useGetStorageSync('info');
  if (!zdmallInfo)
    zdmallInfo = {};
  if (!zdmallInfo.userInfo)
    zdmallInfo.userInfo = {};
  setTimeout(async () => {
    const realTime = useStorage.timeStamp || { local: 0, server: 0 };
    if (!realTime.local || !realTime.server) {
      try {
        const { data: server } = await getSystemTime();
        useStorage.timeStamp = {
          local: +new Date(),
          server
        };
      } catch (error) {}
    }
  }, 0);
  return zdmallInfo;
}

function setZdmallInfo(data) {
  const zdmallInfo = useGetStorageSync('info');
  if (data.registerKey && zdmallInfo.registerKey !== data.registerKey)
    data.registerKeyTimeStamp = useTimeStamp();
  useSetStorageSync('info', data);
}
const storage = {};
export const useStorage = new Proxy(storage, {
  get(target, key) {
    if (!Reflect.has(storage, key))
      Reflect.set(target, key, useGetStorageSync(key));
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    Reflect.set(target, key, value);
    useSetStorageSync(key, value);
    return true;
  }
});
