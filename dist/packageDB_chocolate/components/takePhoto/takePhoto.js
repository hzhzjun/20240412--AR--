const {
  apiDbDomain
} = require("../../db_api/dbrequest");
const {
  apiVertifyStick,
  apiUploadFile,
  logClick
} = require("../../db_api/index");
const {
  globalDBData,
  _throttle
} = require("../../util/util");

const sensors = globalDBData.sensors;

Component({
  data: {
    // 是否展示摄像引导
    showPhotoGuide: false,
    // 拍下来的照片
    cameraImg: '',
    // 还能拍照吗
    canPhoto: true,
    // 是否授权
    authFlag: true,
    // 相机
    showCamera: false
  },
  lifetimes: {
    attached() {
      this.ctx = wx.createCameraContext()
      this.openCamera();

      sensors.track("Qlz_24Wm_PageView", {
        referrer: "/packageDB_chocolate/pages/index/index",
        current_url: "/packageDB_chocolate/pages/index/index",
        page_name: "相机识别",
      })
    },
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
      console.error("相机页面显示");
      this.openCamera();
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  methods: {
    // 授权打开相机
    openCamera() {
      const _this = this

      wx.getSetting({
        success: (res) => {
          console.error("是否授权", res.authSetting['scope.camera']);

          if (!res.authSetting['scope.camera']) {
            wx.authorize({
              scope: 'scope.camera',
              success() {
                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                _this.ctx = wx.createCameraContext();
                _this.setData({
                  // showPhotoGuide: true,
                  showCamera: true,
                  authFlag: true
                })
              },
              fail() {
                wx.showToast({
                  title: '请右上角...设置中打开相机权限',
                  icon: 'none',
                  success: (res) => {
                    _this.setData({
                      authFlag: false,
                      showCamera: false
                    })
                  }
                });
              }
            })
          } else {
            _this.setData({
              authFlag: true,
              showCamera: true
            })
          }
          return;
          let cameraAllowed = res.authSetting['scope.camera']
          console.error("是否授权", cameraAllowed);
          if (cameraAllowed) {
            this.ctx = wx.createCameraContext();
            console.error("我能拿到这个回调码？？？？？？？？， 救命🆘啊😭")
            this.setData({
              showPhotoGuide: true,
              authFlag: true
            })
          } else {
            wx.showToast({
              title: '请右上角...设置中打开相机权限',
              icon: 'none',
              success: (res) => {
                this.setData({
                  authFlag: false
                })
              }
            });
          }
        }
      });
    },

    // 拍照
    async takePhoto() {

      return _throttle(() => {

        
        // await logClick({
        //   dpm: `${globalDBData.appID}.110.11.1`,
        // })
        if (!this.data.authFlag) {
          wx.showToast({
            title: '请右上角...设置中打开相机权限',
            icon: 'none'
          })
          return
        }
        if (!this.data.canPhoto) return;
        this.setData({
          canPhoto: false
        })
        const fs = wx.getFileSystemManager()
        this.ctx.takePhoto({
          quality: 'low',
          success: (res) => {
            // console.error("让朕看看我捉到的是个什么鬼", res)
            const _this = this
            // this.uploadImg(res.tempImagePath)

            // this.setData({
            //   cameraImg: res.tempImagePath
            // })
            wx.getFileSystemManager().readFile({
              filePath: res.tempImagePath, // 图片路径
              encoding: 'base64', // 转换为base64
              success: res => {
                // console.log("转换后的base64", res, res.data); // 转换后的base64
                _this.setData({
                  cameraImg: 'data:image/jpeg;base64,' + res.data
                })

                _this.uploadImg(res.data)
              },
              fail: err => {
                // console.log(err);
              }
            })
          }
        })
      })
    },

    // 上传识别的图片
    async uploadImg(img) {
      // wx.uploadFile({
      //   filePath: img,
      //   name: 'test',
      //   url: apiDbDomain + '/customActivity/duiba/imgUploadUrl',
      //   success (res){ 
      //     const data = res.data
      //     console.error("看看上传之后的东西", data)
      //     //do something
      //   }
      // })

      const res = await apiUploadFile({
        data: {
          img64: 'data:image/jpeg;base64,' + img
        }
      })

      // if(!res.data) return;

      // console.error("图片", res.data)

      const res2 = await apiVertifyStick({
        data: {
          codeImage: 'https:' + res.data
        }
      })

      if (!res2 || !res2.success || !res.data) {
        console.error("没尽力？？");
        // TODO message更改

        setTimeout(() => {
          if (res2.code == "9990") {
            console.log("back", JSON.parse(res2.message).code)
            this.triggerEvent("failCode", JSON.parse(res2.message).code)
            wx.showToast({
              title: JSON.parse(res2.message).message,
              duration: 2000,
              icon: 'none'
            })
          } else {
            // this.triggerEvent("failCode", JSON.parse(res2.message).code)
            wx.showToast({
              title: res2.message,
              duration: 2000,
              icon: 'none'
            })
          }

          sensors.track('Qlz_24Wm_PageClick', {
            page_name: '相机识别',
            button_name: '开始识别',
            current_url: '/packageDB_chocolate/pages/index/index',
            is_verification_success: false,
            is_reached_verification_limit: res2.code == '3003' ? true : false
          })

        }, 1000)

        this.closeModal();
        return
      }

      sensors.track('Qlz_24Wm_PageClick', {
        page_name: '相机识别',
        button_name: '开始识别',
        current_url: '/packageDB_chocolate/pages/index/index',
        is_verification_success: true,
        is_reached_verification_limit: false
      })



      // console.error("res2,快快看看我中奖没！", res2)

      // this.triggerEvent("getHomeInfo")

      this.triggerEvent("setCardInfo", {
        cardVo: res2.data?.cardVo
      })
      // this.triggerEvent('setPrizeInfo', {prizeVo: res2.data?.prizeVo, cardVo: res2.data?.cardVo});

      this.closeModal();



    },

    async closeModal() {
      // sensors.track('Qlz_24Wm_PageClick', {
      //   page_name: '相机识别',
      //   current_url: '/packageDB_chocolate/pages/index/index',
      //   button_name: '手动输入'
      // })
      // await logClick({
      //   dpm: `${globalDBData.appID}.110.12.1`,
      // })
      this.triggerEvent("closeModal", 'showTakePhoto')
    }

  }
})
