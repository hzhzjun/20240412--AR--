/**
 * 检查是否支持.webp 格式图片
 * 支持 webp CDN   ?x-oss-process=image/format,webp
 * 不支持    CDN   ?x-oss-process=image/quality,Q_80
 */


(function () {
  let urlArr = [];
  let flag = false,
    lowAdr = false;
  const ua = navigator.userAgent.toLowerCase()
  const isAndroid = ua.indexOf('android') > -1 || ua.indexOf('adr') > -1;
  if (isAndroid) {
    const ver = parseFloat(ua.substr(ua.indexOf('android') + 8, 3));
    lowAdr = ver < 4.4;
  }
  if (lowAdr && localStorage) {
    delete localStorage.isWebp;
  }
  if (localStorage && !localStorage.isWebp) {
    const img = new Image()
    img.onload = function () {
      if (img.width === 1 && !lowAdr) {
        localStorage.isWebp = true;
        document.getElementsByTagName('html')[0].setAttribute('duiba-webp', 'true')
      } else {
        localStorage.isWebp = '';
      }
    }
    img.onerror = function () {
      flag = true
      localStorage.isWebp = ''
    }
    img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA='
  }

  /**
   * 图片处理
  */
  function getOssImg(url) {
    if (!url) {
      return url
    }
    if (!flag && localStorage && (typeof localStorage.isWebp === 'undefined')) {
      getOssImg(url)
    } else {
      // gif 的图片不做处理
      urlArr = url.split('.')
      // if (urlArr.length > 0 && urlArr[urlArr.length - 1] === 'gif' ) {
      //   return url + ''
      // }
      if (urlArr.length > 0 && ['png', 'jpg', 'jpeg'].includes(urlArr[urlArr.length - 1])) {   //指定'png', 'jpg', 'jpeg'等格式的图片进行处理
        if (localStorage && localStorage.isWebp) {  // 图片支持webp格式设置
          url = url + '?x-oss-process=image/format,webp'
        } else {
          url = url + '?x-oss-process=image/quality,Q_80'
        }
      }
      return url + '';
    }
  }
  String.prototype.ossImg = function () {
    return getOssImg(this)
  }
  Array.prototype.imgWebpArray = function (key) {
    const array = []
    const list = this
    for (let i = 0; i < list.length; i++) {
      if (key && list[i][key]) {
        list[i][key] = list[i][key].ossImg()
      } else if (list[i]) {
        list[i] = list[i].ossImg()
      }
      array.push(list[i])
    }
    return array
  }
})()
