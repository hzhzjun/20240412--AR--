/*
 * @Author: all
 * @Date: 2021-11-01 09:30:00
 * @LastEditTime: 2021-11-02 18:30:00
 * @LastEditors: all
 * @Description:
 */
import { useRef, useEffect, useCallback } from "react";

export {
  _throttle,    // 节流
  useThrottle,  // 节流，函数组件
  _debounce,    // 防抖
  getCookie,    // 获取cookie的值
  getUrlParam,  // 获取url参数
  delUrlParam,  // 删除url中的参数
  subStringCE,   // 截取字符串 中2英1
  check2Object,  // 判断两个对象相等
  getThousandToK, // 转换k
  dateFormatter, // 日期格式化
  dealTime,     // 时间格式化
  second2Date,  // 秒转时间对象
  waitTime,     // 等待一段时间再执行
  randomNum,    // 获取区间随机数 [min,max)
  shuffleArr,   // 随机打乱数组
  flatten,      // 数据扁平化
  onCtrScroll,   // 控制滚动--兼容ios
  trimSpace,     // 去除字符串空格
  GetCurrSkinId,  // 获取当前链接皮肤id
  windowJumpUrl   // window的跳转链接
}

/**
 * @description: 函数节流，普通防连点
 * @param {(Function, number?)}
 * @return {Function}
 */
const _throttle = (fun, delay = 2000) => {
  let last, deferTimer;
  return function () {
    const now = +new Date();
    if (last && now < last + delay) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
      }, delay);
    } else {
      last = now;
      fun.apply(this, arguments);
    }
  };
};


function useThrottle(fn, delay = 2000, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(function () {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn.call(this, ...args);
    }
  }, dep);
}

/**
 * @description: 函数防抖
 * @param {(Function, number?, boolean? )}
 * @return {Function}
 */
const _debounce = (fn, wait = 2000, immediate = false) => {
  let timer = null
  return function () {
    const later = function () {
      fn.apply(this, arguments)
    }
    if (immediate && !timer) {
      later()
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(later, wait)
  }
}

/**
 * 获取cookie的值
 * @param {*} cookieName
 */
function getCookie(cookieName) {
  const strCookie = document.cookie;
  const arrCookie = strCookie.split('; ');
  for (let i = 0; i < arrCookie.length; i++) {
    const arr = arrCookie[i].split('=');
    if (cookieName == arr[0]) {
      return arr[1];
    }
  }
  return '';
}
/**
 * 获取url参数
 * @param {string} name
 */
function getUrlParam(name) {
  const search = window.location.search;
  const matched = search
    .slice(1)
    .match(new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'));
  return search.length ? matched && matched[2] : null;
}
/**
 * 删除url中的参数
 * @param {*} url
 * @param {*} arg
 */
function delUrlParam(url, paramKey) {
  const _url = new URL(url)
  const search = new URLSearchParams(_url.search)
  search.delete(paramKey)
  _url.search = search.toString();
  return _url.href;
}
/**
 * 日期格式化
 * @param date    接收可以被new Date()方法转换的内容
 * @param format  字符串，需要的格式例如：'yyyy/MM/dd hh:mm:ss'
 * @returns {String}
 */
const dateFormatter = (date, format = "yyyy/MM/dd") => {
  if (!date) return "-";
  date = new Date(
    typeof date === "string" && isNaN(date)
      ? date.replace(/-/g, "/")
      : Number(date)
  );
  const o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
};

/** 时间格式化 */
const dealTime = (msTime) => {
  const time = msTime / 1000;
  let hour = Math.floor(time / 60 / 60) % 24;
  let minute = Math.floor(time / 60) % 60;
  let second = Math.floor(time) % 60;
  hour = hour > 9 ? hour : "0" + hour;
  minute = minute > 9 ? minute : "0" + minute;
  second = second > 9 ? second : "0" + second;
  return `${hour}:${minute}:${second}`;
}

/**
 * 转换k
 * @param {*} num
 */
function getThousandToK(num) {
  let s_x;
  if (num >= 1000) {
    let result = num / 1000;
    result = Math.floor(result * 10) / 10;
    s_x = result.toString();
    let pos_decimal = s_x.indexOf(".");
    if (pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += ".";
    }
    while (s_x.length <= pos_decimal + 1) {
      s_x += "0";
    }
    s_x += "k";
  } else {
    s_x = num;
  }
  return s_x;
}

/**
 * 截取字符串 中2英1
 * @param {*} str
 * @param {*} sub_length
 */
function subStringCE(str, sub_length) {
  const temp1 = str.replace(/[^\x20-\xff]/g, "**");
  const temp2 = temp1.substring(0, sub_length);
  const x_length = temp2.split("*").length - 1;
  const hanzi_num = x_length / 2;
  sub_length = sub_length - hanzi_num;
  const res = str.substring(0, sub_length);
  let endStr;
  if (sub_length < str.length) {
    endStr = res + "...";
  } else {
    endStr = res;
  }
  return endStr;
}

/**
 * 随机打乱数组
 * @param {*} arr
 * @returns
 */
function shuffleArr(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const itemAtIndex = arr[randomIndex]
    arr[randomIndex] = arr[i]
    arr[i] = itemAtIndex
  }
  return arr
}

/**
 *  获取区间随机数 [min,max)
 * @export
 * @param {*} min
 * @param {*} max
 * @return {*}
 */
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 *  数据扁平化
 * @export
 * @param {*} arr
 * @return {*}
 */
function flatten(arr) {
  return arr.reduce((result, item) => {
    return result.concat(Array.isArray(item) ? flatten(item) : item)
  }, [])
}

/** 判断两个对象相等 */
const check2Object = (obj1, obj2) => {
  const o1 = obj1 instanceof Object
  const o2 = obj2 instanceof Object
  if (!o1 || !o2) { /*  判断不是对象  */
    return obj1 === obj2
  }
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
  }
  for (const attr in obj1) {
    const t1 = obj1[attr] instanceof Object
    const t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return check2Object(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}

/**
 * 秒转时间对象
 * @param {Number} totalSecond 总秒数
 * @return {{
 *  day: String,
 *  hour: String,
 *  minute: String,
 *  second: String
 * }}
 */
const second2Date = (totalSecond) => {
  const millisecond = totalSecond % 1000
  totalSecond = totalSecond / 1000

  // 获得总分钟数
  const totalMinute = totalSecond / 60
  // 获得剩余秒数
  const second = totalSecond % 60
  // 获得小时数
  const totalHour = totalMinute / 60
  // 获得分钟数
  const minute = totalMinute % 60
  // 获得天数
  const day = totalHour / 24
  // 获得剩余小时数
  const hour = totalHour % 24
  // 格式化的键值
  const includesKey = ['month', 'day', 'hour', 'minute', 'second', 'totalHour', 'totalMinute']
  // 日期对象
  const dateObj = { day, hour, minute, second, millisecond, totalHour, totalMinute }

  return Object.keys(dateObj).reduce((preVal, key) => {
    // 值取整
    const value = parseInt(dateObj[key])

    if (includesKey.includes(key) && value < 10) {
      if (value < 0) {
        preVal[key] = '00'
      } else {
        preVal[key] = '0' + value
      }
    } else {
      if (value.toString() === 'NaN') {
        preVal[key] = '0'
      } else {
        preVal[key] = value.toString()
      }
    }

    return preVal
  }, {})
}

/**
 * 等待一段时间再执行
 * @param {number} time 等待的时间ms
 */
function waitTime(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

/** 控制滚动--兼容ios */
const bodyScroll = (event) => {
  event.preventDefault();
}
const onCtrScroll = (flag = true) => {
  if (flag) { // 禁止滚动
    document.body.addEventListener('touchmove', bodyScroll, { passive: false });
  } else { // 开启滚动
    document.body.removeEventListener('touchmove', bodyScroll, { passive: false });
  }
}

/**
 * 删除中间所有的空格
 * @param {string} str
 * @returns
 */
const trimSpace = (str) => {
  let result;
  result = str.replace(/(^\s+)|(\s+$)/g, "");
  result = result.replace(/\s/g, "");
  return result;
}


/**
  * 获取当前皮肤id
  * @returns
  */
const GetCurrSkinId = () => {
  // eslint-disable-next-line no-useless-escape
  const matched = location.pathname.match(/\/([^\/]*).html/);
  const currSkinId = matched ? matched && matched[1] : ''
  console.log('当前皮肤id', currSkinId)
  return currSkinId
}

export const getCustomShareId = () => {
  const matched = location.href.match(/\/share\?id=(.*)/);
  const shareId = matched ? matched && matched[1] : '';
  console.log('自定义活动页id', shareId);
  return shareId;
};

/** 跳转 */
const windowJumpUrl = (url) => {
  url && (location.href = url);
};
