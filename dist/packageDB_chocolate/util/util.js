import sensors from '../../module/sensorsdata.min';

const formatTime = (date, type = 1) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if (type == 1) {
    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
  }
  if (type == 2) {
    return `${[year, month].map(formatNumber).join('.')}`
  }
  if (type == 3) {
    return `${[year, month, day].map(formatNumber).join('.')} ${[hour, minute, second].map(formatNumber).join(':')}`
  }

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * 传入对象返回url参数
 * @param {Object} data {a:1}
 * @returns {string}
 */
const getParam = (data) => {
  let url = '';
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}

/**
 * 将url和参数拼接成完整地址
 * @param {string} url url地址
 * @param {Json} data json对象
 * @returns {string}
 */
const getUrl = (url, data) => {
  //看原始url地址中开头是否带?，然后拼接处理好的参数
  return url += (url.indexOf('?') < 0 ? '?' : '&') + getParam(data)
}

const isEmojiCharacterIndex = (substring) => {
  if (substring) {
    var flag = false;
    var index = -1;
    for (var i = 0; i < substring.length; i++) {
      var hs = substring.charCodeAt(i);
      console.log(hs, i)
      if (0xd800 <= hs && hs <= 0xdbff) {
        if (substring.length > 1) {
          var ls = substring.charCodeAt(i + 1);
          var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
          if (0x1d000 <= uc && uc <= 0x1f77f) {
            flag = true;
            index = i;
            break;
          }
        }
      } else if (substring.length > 1) {
        var ls = substring.charCodeAt(i + 1);
        if (ls == 0x20e3) {
          flag = true;
          index = i;
          break;
        }
      } else {
        if (0x2100 <= hs && hs <= 0x27ff) {
          flag = true;
          index = i;
          break;
        } else if (0x2B05 <= hs && hs <= 0x2b07) {
          flag = true;
          index = i;
          break;
        } else if (0x2934 <= hs && hs <= 0x2935) {
          flag = true;
          index = i;
          break;
        } else if (0x3297 <= hs && hs <= 0x3299) {
          flag = true;
          index = i;
          break;
        } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 ||
          hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b ||
          hs == 0x2b50) {
          flag = true;
          index = i;
          break;
        }
      }

    }
    return index;
  }
};

const lockObj = {}
const _throttle = (fun, delay = 2000) => {
    if (!lockObj[fun]) {
        lockObj[fun] = true
        fun()
        setTimeout(() => {
            lockObj[fun] = false
        }, delay)
    }
}

const productName = {
  "qcb": "巧脆棒产品包装",
  "qlg": "巧恋果产品包装",
  "xnb": "香奶棒产品包装",
  "sgq": "四个圈产品包装",
  "qsr": "巧丝绒产品包装"
}

const globalDBData = {
  userId: null,
  code: null,
  projectxID: "pa9aa12ab", //线上测试环境 pd173e66b 测试 pe20ff3fe 正式 pa9aa12ab
  // projectxID: "pe20ff3fe",
  appID: "96149", // 线上测试 96149 测试 19487 正式 96149
  // appID: "19487", // 线上测试 96149 测试 19487
  locationOrigin: "https://95721.activity-18.m.duiba.com.cn/projectx/",
  locationOriginPrize: "https://95721.activity-18.m.duiba.com.cn",
  loginToken: wx.getStorageSync('db_loginToken'),
  //KHk31QbrClwy0g4S4sNLjBhk7Iozf+/Q25p6nHfn6ExpSzwHn1Ehe+wntDA9qii6Tz16KjdIMIvK3soSDKFGYY45buUPGUA3I2I+Lkqf5zSpZVg+gca3LJA+YHNX6uvS
  // qa6OBaLjEikUcIac8WSshvBSm+Fv0BmhucDrkdGt57b8SAT2sijraIiepV1/rRMaDQ3+vqjf4sZbvAs45fhOAdFp/zIq3a4GfhUT759Pj4ZOVlKZGXzD1CVqaReCd6ec
  scanDomainConfigs:{},
  app_key: "zdbdc9671ff9c07705", // zd3301a0dd72b482fe 正式：zdbdc9671ff9c07705
  sensors: sensors,
  source: ''
}





const dateFormatter = (date, format = "yyyy.MM.dd hh.mm") => {
  if (!date) return "-";
  date = new Date(
    typeof date === "string" && isNaN(date) ?
    date.replace(/-/g, "/") :
    Number(date)
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
}

module.exports = {
  formatTime,
  getUrl,
  globalDBData,
  _throttle,
  dateFormatter,
  productName
}
