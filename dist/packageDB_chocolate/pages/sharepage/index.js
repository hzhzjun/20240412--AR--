const { apiReceiveCard } = require("../../db_api/index")
const { CARD_ID } = require("../../util/constans")
const {globalDBData} = require("../../util/util");

const sensors = globalDBData.sensors

// packageDB_chocolate/pages/sharepage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSend:null,
    isWant:null,
    cardId:null,
    cardImg:"",
    inviteCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    console.error(options, "ioposa")
    if(options?.shareType == "send"){
      this.setData({isSend:true})
      sensors.track("Qlz_24Wm_PageView",{
        page_name: '赠卡分享落地页',
        current_url:"/packageDB_chocolate/pages/sharepage/index",
      })
    }
    if(options?.shareType == "want"){
      this.setData({isWant:true})
      sensors.track("Qlz_24Wm_PageView",{
        page_name: '索卡分享落地页',
        current_url:"/packageDB_chocolate/pages/sharepage/index",
      })
    }
    this.setData({cardId:options?.cardId, inviteCode: options?.inviteCode})
    this.setData({cardImg:CARD_ID[options?.cardId]})



    
  },

  //进入活动
  async gotoAct(){
    // if(this.data.isSend){
    //   //立即领取
    //   const {data,success} = await apiReceiveCard({
    //     id:this.data.cardId
    //   })
    //   if(success){
    //     wx.showToast({
    //       title: '领取成功，快去收集更多巧卡吧～',
    //       duration: 0,
    //       icon: icon,
    //       image: 'image',
    //       mask: true,
    //     })
    //   }
      sensors.track("Qlz_24Wm_PageClick",{
        page_name: '赠卡分享落地页',
        current_url:"/packageDB_chocolate/pages/sharepage/index",
      })
    // }
    if(this.data.isWant){
      //立即赠送
      sensors.track("Qlz_24Wm_PageClick",{
        page_name: '索卡分享落地页',
        current_url:"/packageDB_chocolate/pages/sharepage/index",
      })
    }
    wx.navigateTo({
      url: `/packageDB_chocolate/pages/loadPage/loadPage?&cardId=${this.data.cardId}&shareType=${this.data.isWant ? 'want' : 'send'}&inviteCode=${this.data.inviteCode}`
    })
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