import {
  apirecordQuery, dbH5Login
} from "../../db_api/index"
import { globalDBData } from "../../util/util";

// packageDB_chocolate/pages/prizePage/prizePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prizeList: [],
    listHight: 300
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.createSelectorQuery().select("#container").boundingClientRect((rect) => {
      let height = 1624 * rect.width / 750 - 280;
      // let width = 

      console.log("页面高度为", height);
      this.setData({
        listHight: height
      })
    }).exec();
    let res = await apirecordQuery();
    console.log("prizepage", res)
    let list = []
    for(let i = 0;i<res.data.length;i++){
      if(res.data[i].prizeId.indexOf("sp") == -1){
        res.data[i].gmtCreate  = this.dateFormatter(res.data[i].gmtCreate)
        list.push(res.data[i])
      }
      
    }
    this.setData({
      prizeList: list
    })
  },
  dateFormatter (date, format = "yyyy.MM.dd hh.mm") {
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
  },
  async goLink(e){
    console.log(e.currentTarget.dataset.iteminfo)
    const index = e.target.dataset.index || e.currentTarget.dataset.index;
    const item = this.data?.prizeList?.[index] || {}
    if (item?.extra?.refType === "object") {
      let prizeUrl  = ""
      if(item.url){
        prizeUrl = item.url;
      }else{
        prizeUrl = `${globalDBData.locationOriginPrize}/aaw/projectx/takePrize?projectOrderNo=${item.id}`;
      }
      let params = {
        url: prizeUrl,
        dbredirect: prizeUrl
      }
      const {success, message, data} = await dbH5Login({
        data: {
          ...params
        }
      });

      if(success && data && data.url){
         wx.navigateTo({
          url: `/packageDB_chocolate/pages/webview/webview?url=${encodeURIComponent(data.url)}`,
        })
      }else{
        wx.showToast({
          title: message||"网络异常，请稍候再试",
          icon: "none"
        })
      }
    } else {
      wx.switchTab({
        url: '/pages/two/two',
      })
    }
  },
  back(){
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
