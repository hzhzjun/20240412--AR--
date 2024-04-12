const requestFun = async (dataSouce) => {
  wx.showLoading({
    mask: true
  })
  console.warn(dataSouce, "这是请求的接口 dataSouce")
  return await new Promise((resolve, reject) => {
    wx.request({
      ...dataSouce,
      success: (res) => {
        wx.hideLoading()
        console.log(`%c 数据返回 ${dataSouce.url.split("/").pop()}\n`, "font-size: 20px; color: #b993ed", res)
        resolve(res.data);
      },

      fail: (res) => {
        wx.hideLoading()
        console.error("数据返回 res:失败数据", res)
        setTimeout(() => {
          wx.showToast({
            title: `${res.message}`,
            duration: 0,
            // icon: 'error',
            image: 'image',
            mask: true,
            success: (res) => {},
            fail: (res) => {},
            complete: (res) => {},
          })
        }, 1000)
        reject(res.data);
      }
    });
  })
}

export default requestFun;
