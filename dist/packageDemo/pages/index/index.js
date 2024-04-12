Page({
  data: {},
  onLoad() {},
  async handleAuth() {
    try {
      const res = await this.selectComponent('#auth').auth()
      console.log(res)
      wx.showToast({
        title: '授权成功！'
      })

      const res2 = await getApp().getAuthorizationCode('zd3301a0dd72b482fe')
      console.error("看看code", res2, res2.code);
    } catch (error) {
      // 用户拒绝授权，或者注册登录失败
    }
  },
  handleContact() {
    getApp().goUdeskContact({ target: '_udesk' })
  }
})
