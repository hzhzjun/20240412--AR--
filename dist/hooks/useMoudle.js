import { getAuthCode } from '../api/auth/account';
import { getWxcode, getWxcodeValue } from '../api/commons/common';
import { isNewMember } from '../api/member/member';
import Address from '../mixins/Address';
import amapFile from '../module/amap-wx.js';
import { globalData } from '../settings';
import { useArgsUrl } from './useArgs';
import { useTimeStamp } from './useDate';
import { jumpPage } from './useRouter';
import { zdmallInfo } from './useStorage';
import { isArray, isCode } from './useValidate';
export async function getWxcodeImage(query) {
  try {
    if (typeof query !== 'object' || typeof query.page !== 'string' || typeof query.parameter !== 'string')
      throw Error('getWxcodeImage方法参数有误，请确认');
    const request = {
      page: query.page,
      parameter: query.parameter || '',
      envVersion: query.envVersion || 'release'
    };
    const { data: qrcode } = await getWxcode(request);
    return Promise.resolve({
      errmsg: '',
      qrcode
    });
  } catch (error) {
    return Promise.resolve({
      errmsg: typeof error === 'string' ? error : String(error.message),
      qrcode: ''
    });
  }
}
export async function getWxcodeOptions(scene) {
  try {
    if (typeof scene !== 'string' || scene.trim() === '' || !isCode(scene))
      throw Error('getWxcodeOptions方法参数有误，请确认');
    const { data: parameter } = await getWxcodeValue(scene);
    const options = useArgsUrl('?' + parameter);
    return Promise.resolve({
      errmsg: '',
      options
    });
  } catch (error) {
    return Promise.resolve({
      errmsg: typeof error === 'string' ? error : String(error.message),
      options: {}
    });
  }
}
export async function getMemberStatus(query) {
  try {
    if (typeof query !== 'object' || typeof query.time !== 'string')
      throw Error('getMemberStatus方法参数有误，请确认');
    if (!zdmallInfo.userInfo.openId)
      throw Error('尚未取得用户openid');
    const request = {
      openId: zdmallInfo.userInfo.openId,
      fromDateTime: useTimeStamp(query.time)
    };
    const { data } = await isNewMember(request);
    return Promise.resolve({
      errmsg: '',
      isNewMember: data
    });
  } catch (error) {
    return Promise.resolve({
      errmsg: typeof error === 'string' ? error : String(error.message)
    });
  }
}
export function getLocation() {
  return new Promise(async (resolve) => {
    try {
      const myAmapFun = new amapFile.AMapWX({ key: globalData.amapKey });
      myAmapFun.getRegeo({
        success: (res) => {
          if (isArray(res) && res.length) {
            const info = res[0];
            const detail = info.regeocodeData.addressComponent;
            resolve({
              errmsg: '',
              country: detail.country,
              province: detail.province,
              city: detail.city,
              district: detail.district,
              desc: info.desc,
              longitude: info.longitude,
              latitude: info.latitude
            });
          } else {
            resolve({
              errmsg: '用户拒绝授权或地址解析失败'
            });
          }
        },
        fail: () => {
          resolve({
            errmsg: '用户拒绝授权或地址解析失败'
          });
        }
      });
    } catch (error) {
      resolve({
        errmsg: '用户拒绝授权或地址解析失败'
      });
    }
  });
}
export function goUdeskContact({ target = '_udesk', groupId = '' }) {
  jumpPage({
    target,
    groupId
  });
}
export function getDefaultAddress() {
  return new Promise(async (resolve) => {
    try {
      if (!zdmallInfo.accessToken) {
        throw Error('用户未登录');
      }
      return resolve(await Address.getDefaultAddress());
    } catch (error) {
      resolve({
        errmsg: typeof error === 'string' ? error : String(error.message)
      });
    }
  });
}
export function getAuthorizationCode(app_key) {
  return new Promise(async (resolve) => {
    try {
      if (typeof app_key !== 'string')
        throw Error('getAuthCode方法参数有误，请确认');
      if (!zdmallInfo.accessToken) {
        throw Error('用户未登录');
      }
      const { data: code } = await getAuthCode({ app_key });
      return resolve({
        errmsg: '',
        authorization_code: code
      });
    } catch (error) {
      resolve({
        errmsg: typeof error === 'string' ? error : String(error.message)
      });
    }
  });
}
