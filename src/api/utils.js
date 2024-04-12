import { getPxToken } from "@spark/projectx";
import { callApi } from '@spark/api-base'
import { Loading, Toast } from '@spark/ui'

import { isFromShare, newUser } from 'duiba-utils';
import { errorHandler } from "@src/utils/errorHandler";

const mergeData = {
  user_type: newUser ? '0' : '1',
  is_from_share: isFromShare ? '0' : '1',
}

/**
 * 请求方法get、post处理
 * @param {*} value
 * @returns
 */
function getRequestParams(value) {
  if (typeof value === 'string') {
    return {
      uri: value,
      method: 'get'
    }
  } else if (typeof value === 'object') {
    const { uri, method = 'get', showMsg = true, showLoading = false, headers, withToken, secret, secretKey, contentType = 'form' } = value;
    return {
      uri,
      method,
      headers,
      withToken,
      secret,
      secretKey,
      contentType,
      showLoading,
      showMsg
    }
  } else {
    console.error('getRequestParams: 传参有误');
  }
}

/**
 * 请求API通用处理
 * @param {*} value
 * @returns
 */
export function generateAPI(apiList) {
  const api = {};
  for (const key in apiList) {
    const value = apiList[key];

    const { method, uri, headers: mHeaders, withToken, secret, secretKey, contentType, showLoading, showMsg = true } = getRequestParams(value);
    api[key] = async (params = {}, headers) => {
      // 根据接口配置showLoading展示loading
      // 600ms内结束的请求不显示loading，避免闪烁
      let query = false;
      showLoading && setTimeout(() => {
        if (!query) {
          Loading.show();
        }
      }, 600);
      let token;
      if (withToken) {   // 是否携带token
        try {
          token = await getPxToken(); // 获取token
        } catch (e) {
          Toast('网络异常，请稍后再试~');
          query = true;
          showLoading && Loading.hide();// 根据接口配置showLoading关闭loading
          return ({ success: false, data: '' });
        }
      }

      const mergedHeaders = { ...mHeaders, ...headers }
      if (withToken && token) {
        params.token = token;
      }

      params = { ...params, ...mergeData };

      const result = await callApi(uri, params, method, mergedHeaders, false, secret, secretKey, contentType)
        .catch(e => {
          query = true;
          // 捕获网络异常
          showMsg && Toast(e.message || '网络异常，请稍后再试~');
          showLoading && Loading.hide();
        });
      query = true;
      showLoading && Loading.hide();// 根据接口配置showLoading关闭loading
      return new Promise((resolve) => {

        if (result) {
          // 判断接口错误
          if (!result.success && showMsg) {
            errorHandler(result);
          }
          // 返回整个结果
          resolve(result);
        } else {
          resolve({ success: false, data: '' });
        }
      })
    }
  }

  return api;
}
