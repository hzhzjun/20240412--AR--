import {
  isLogin
} from "../../../hooks/useUserStatus";
import { Toast } from "../../components/Turntable/utils";
import {
  dbLogExposure,
  dbLoginParam
} from "../../db_api/dbrequest";
import {
  apiCompound,
  apiCoopIndex,
  apiDoAssit,
  apiGetCardBySend,
  apiGetCardByWant,
  apiGetSendCode,
  apiGetWantCode,
  apiqueryUserSps,
  apiReceiveCard,
  apiReceiveCode,
  logClick,
  logExposure,
  reqDbLogin,
} from "../../db_api/index";
import {
  CARD_ID,
  SHARE_IMG,
  SHARE_TEXT
} from "../../util/constans";
import {
  dateFormatter,
  globalDBData,
} from "../../util/util";
const sensors = globalDBData.sensors;

let shareType = 'normal'
let shareCardId = '';
let inviteCode = ''
let hasInvite = false


const publicProperty = {
  product_name: "巧乐兹",
  atv_page: "24年物码活动",
  utm_campaign: globalDBData.source,
}
Page({
  data: {
    maList: ["", "", "", "", "", "", "", "", ""],
    isScroll: true,
    inputInfo: "",
    paddingleft: 0,
    guafenNum: 0,
    // 相机引导
    showPhotoGuide: false,
    // 当前分享类型
    shareType: "want", // want：索卡 send：赠卡
    // 当前分享的链接
    shareLink: "/packageDB_chocolate/pages/index/index",
    // 当前分享标题
    shareTitle: SHARE_TEXT.normal,
    // 当前分享图片
    shareImg: SHARE_IMG.normal,
    // 是否登陆
    loginFlag: false,
    // 是否展示授权弹窗
    showAuth: false,
    inputID: 9,
    spList: [{
      spCount: 0,
      spId: "sp_card_1",
      isNotLogin: true
    },
    {
      spCount: 0,
      spId: "sp_card_2",
      isNotLogin: true
    },
    {
      spCount: 0,
      spId: "sp_card_3",
      isNotLogin: true
    },
    {
      spCount: 0,
      spId: "sp_card_4",
      isNotLogin: true
    },
    {
      spCount: 0,
      spId: "sp_card_5",
      isNotLogin: true
    },
    {
      spCount: 0,
      spId: "sp_amount"
    },
    ],
    CARD_ID: CARD_ID,
    showedge: true,
    littleCardList: [{
      spCount: 0,
      spId: "sp_total_card"
    },
    {
      spCount: 0,
      spId: "sp_card_1"
    },
    {
      spCount: 0,
      spId: "sp_card_2"
    },
    {
      spCount: 0,
      spId: "sp_card_3"
    },
    {
      spCount: 0,
      spId: "sp_card_4"
    },
    {
      spCount: 0,
      spId: "sp_card_5"
    }
    ],
    currentId: 0, // 当前轮播index
    // 公告弹窗显隐
    showNotice: false,
    // 活动规则弹窗显隐
    showRule: false,
    dividePop: null, //瓜分弹窗，不为空弹出
    cardPrizeInfo: null, //扫棒签码的奖励(弹窗)
    getMoneyPrizePop: null, //2元立减金中奖弹窗信息
    sendCardConfirmInfo: null, //赠卡二次确认弹窗信息
    synthesisSvga: null, //合成动效弹窗
    // 新手引导
    showNewGuide: false,
    // 展示照相部分
    showTakePhoto: false,
    // 中奖卡片信息
    cardVo: null,
    // 中奖优惠券信息
    prizeVo: null,
    // 合成动效
    showhechengAni: false,
    // 是否展示合成瓜分文本
    showGuafenLab: false,
    // 是否扫码限制
    scanLimitFlag: false,
    // 签码获得奖励
    getcardandquanInfo: null,
    // 是否可以开始兑换
    exchange: false,
    // 首页展示活动时间
    activityTime: "",
    onLoadOptions: {},
    // 大转盘参与弹窗
    joinTurntable: false
  },

  async onLoad(options) {
    this.setData({
      onLoadOptions: options,
    })
    console.error("看看主包的登陆对不对", isLogin(), options)

    // this.setData({
    //   showAuth: !isLogin()
    // })

    console.error('首页看看渠道进来没有', publicProperty, globalDBData.source)


    // if(options?.source) {
    //   publicProperty.utm_campaign = productName[options?.source]
    //   sensors.registerApp({
    //     product_name: "巧乐兹",
    //     atv_page: "24年物码活动",
    //     utm_campaign: productName[options?.source],
    //   })
    // }


    console.error("我是子包的首页onLoad");
    // TODO 先调首页
    // await this.getHomeInfo();
    // 是否走新手引导
    const showGuide = wx.getStorageSync('showGuide');
    if (!showGuide) {
      this.setData({
        showNewGuide: true
      })
    }
    // if(!isLogin()) {
    //   await this.doAuth();
    // }
    // 助力
    // if (options.inviteCode && isLogin()) {
    //   const shareType = options.shareType;
    //   if (shareType) {
    //     await this.doAssist(shareType, options.inviteCode,options.cardId)
    //   } else {
    //     await this.normalAssit(options.inviteCode)
    //   }
    //   await this.getHomeInfo();
    //   console.warn("进来的参数", options);

    // }

    // 记录是否登录
    // const loginFlag = isLogin();

    // this.setData({
    //   loginFlag
    // })

    // 曝光埋点
    // const res = await logExposure({
    //   dpm: `${globalData.appID}.110.1.1`,
    // })

    // 点击埋点
    // const res = await logClick({
    //   dpm: `${globalData.appID}.110.1.1`,
    // })

    // this.setData({
    //   showAuth: true
    // })
    // this.selectComponent('#auth').setData({
    //   showModal: true
    // })
    // const res = await this.selectComponent('#auth').auth()

    // console.log("看看接口", res)
    sensors.track("Qlz_24Wm_PageView", {
      referrer: "/packageDB_chocolate/pages/loadPage/loadPage",
      current_url: "/packageDB_chocolate/pages/index/index",
      page_name: "活动首页",
    })
  },
  async onShow() {
    console.error("我是子包的首页onShow");
    // if(!isLogin()) {
    //   await this.doAuth();
    // }
    // await this.getHomeInfo();

    await this.doAuth();
    shareType = 'normal'


    // this.setData({
    //   shareLink: `/packageDB_chocolate/pages/index/index`,
    //   shareTitle: SHARE_TEXT.normal,
    //   shareImg: SHARE_IMG.normal,
    //   shareImg: SHARE_IMG.normal,
    // })

  },

  // 判断是否出授权弹窗
  // async checkLogin() {
  //   // console.error(globalData.login, this.data.showAuth)
  //   if (!isLogin()) {
  //     await this.selectComponent('#auth').auth()
  //   }
  // },

  // 普通助力 简单形成绑定关系
  async normalAssit(inviteCode) {
    const res = await apiDoAssit({
      data: {
        inviteCode
      }
    })

    if (!res || !res.success) {
      setTimeout(() => {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }, 1000)
    }


  },
  // 首页接口
  async getHomeInfo() {
    const res = await apiCoopIndex({
      data: {
        ...publicProperty
      }
    });
    // console.error("首页数据", res)
    if (res.success) {
      globalDBData.userId = res.userId;
      const {
        totalAcquireNum,
        systemTime,
        actEndTime,
        actStartTime,
        dividePop,
        showGuideFlag,
        scanLimitFlag,
        exchange,
        noticePop,
        historyActType,
        returnCardNum
      } = res.data;
      if (returnCardNum > 0) {
        setTimeout(() => {
          Toast("好友24小时内未领取巧卡，巧卡已退回～")
        }, 1000)
      }
      this.setData({
        guafenNum: totalAcquireNum,
        systemTime,
        actEndTime,
        actStartTime,
        dividePop,
        // showNewGuide: showGuideFlag,
        scanLimitFlag: scanLimitFlag,
        exchange: exchange,
        activityTime: dateFormatter(actStartTime, "yyyy.MM.dd") + "-" + dateFormatter(actEndTime, "yyyy.MM.dd"),
        showNotice: noticePop,
        joinTurntable: !!historyActType,
      });
    }
    sensors.track("Qlz_24Wm_BannerExposure", {
      current_url: "/packageDB_chocolate/pages/index/index",
      page_name: "活动首页",
      banner_name: "瓜分banner",
      banner_id: 0//"瓜分banner"
    })
    sensors.track("Qlz_24Wm_BannerExposure", {
      current_url: "/packageDB_chocolate/pages/index/index",
      page_name: "活动首页",
      banner_name: "码上参与",
      banner_id: 1//"扫码banner"
    })
    const resSp = await apiqueryUserSps();
    if (resSp.success) {
      const {
        spList
      } = resSp.data;
      this.doHeCheng(spList)
      let listbig = [];
      let listsmall = [];
      for (let i = 0; i < spList.length; i++) {
        if (spList[i].spId == "sp_amount") {
          listbig.push(spList[i]);
        } else if (spList[i].spId == "sp_total_card") {
          if (spList[i].spCount > 0) {
            this.setData({
              showGuafenLab: true
            })
          }
          listsmall.push(spList[i]);
        } else {
          listbig.push(spList[i]);
          listsmall.push(spList[i]);
        }
      }
      listbig = this.sortSwiper(["sp_card_1", "sp_card_2", "sp_card_3", "sp_card_4", "sp_card_5", "sp_amount"], listbig);
      listsmall = this.sortSwiper(
        ["sp_total_card", "sp_card_1", "sp_card_2", "sp_card_3", "sp_card_4", "sp_card_5"],
        listsmall
      );

      this.setData({
        spList: listbig,
        littleCardList: listsmall
      });
      console.log(listbig, "_+_+_+_+_", listsmall);

    }

    // 曝光埋点
  },
  // 触发合成
  async doHeCheng(spList) {
    let canDo = false;
    for (let i = 0; i < spList.length; i++) {
      if (spList[i].spId != "sp_amount" && spList[i].spId != "sp_total_card") {
        if (spList[i].spCount == 0) {
          canDo = false;
          break
        } else {
          canDo = true
        }
      }
    }
    if (canDo) {
      console.log("可以合成")
      const res = await apiCompound({
        data: {
          ...publicProperty
        }
      });
      if (res.success) {
        // TODO弹出红包弹窗
        this.setData({
          showhechengAni: true
        })
        this.getHomeInfo()
        setTimeout(() => {
          this.setData({
            showhechengAni: false,
            getMoneyPrizePop: res.data.prize
          })
        }, 2100)
      }
    }
  },
  // 轮播排序
  sortSwiper(typeList, list) {
    let showList = [];
    for (let i = 0; i < typeList.length; i++) {
      for (let n = 0; n < list.length; n++) {
        if (typeList[i] == list[n].spId) {
          showList.push(list[n]);
          break;
        }
      }
    }
    return showList;
  },
  async click_card(e) {

    // if (!isLogin()) {
    //   await this.selectComponent("#auth").auth();
    //   return
    // }

    console.log(e.currentTarget.dataset.index, "-=--=-=-==-=-=-", (e.currentTarget.dataset.index + 5) % 6)
    this.setData({
      currentId: (e.currentTarget.dataset.index + 5) % 6
    })

  },
  async click_duihuan() {
    if (!isLogin()) {
      await this.doAuth();
      return
    }
    wx.navigateTo({
      url: '/packageDB_chocolate/pages/exchangePage/exchangePage',
    })
  },
  // 授权
  async doAuth() {

    await this.selectComponent("#auth").auth();
    const res = await getApp().getAuthorizationCode(globalDBData.app_key);
    // 曝光埋点
    // const res = await logExposure({
    //   dpm: `${globalData.appID}.110.1.1`,
    // })

    console.error("chengogn", res);

    if (res) {
      await this.miniAutoLogin(res.authorization_code);
    }
  },

  // 小程序免登
  async miniAutoLogin(code) {
    console.error("授权授权？？？", code);
    const res = await reqDbLogin({
      data: {
        code,
        redirectUrl: "",
        appId: globalDBData.appID,
      },
    });

    // if (!res || !res.success || !res.data) return;


    globalDBData.loginToken = res.data?.loginToken;
    wx.setStorageSync("db_loginToken", res.data.loginToken);

    console.error("loginToken", res.data.loginToken);
    if (this.data.onLoadOptions?.inviteCode) {
      console.error("------");
      const shareType = this.data.onLoadOptions?.shareType;
      if (shareType != 'normal') {
        await this.doAssist(shareType, this.data.onLoadOptions?.inviteCode, this.data.onLoadOptions?.cardId)
      } else {
        await this.normalAssit(this.data.onLoadOptions?.inviteCode)
      }
      this.setData({
        onLoadOptions: null
      })
      console.warn("进来的参数", this.data.onLoadOptions);
    }
    await this.getHomeInfo();
  },

  // 关闭相关弹窗
  closeModal(modalValue) {
    if (modalValue?.detail == "showTakePhoto") {
      sensors.track('Qlz_24Wm_PageClick', {
        page_name: '相机识别',
        current_url: '/packageDB_chocolate/pages/index/index',
        button_name: '去首页手动输入棒签码'
      })
    }
    this.setData({
      [modalValue?.detail || modalValue]: false,
    });

  },
  // 扫码失败回传
  failCode(code) {
    console.log(code.detail)
    const str = code.detail;
    let arr = Array.from(str);
    console.log(arr, arr.length);
    if (arr.length > 9) {
      arr = arr.splice(0, 9)
    }
    this.setData({
      maList: arr
    })
  },

  // 打开弹窗
  async openModal(e) {
    if (!isLogin()) {
      await this.doAuth();
      return
    }
    if (e.currentTarget.dataset.modalname == "showRule") {
      sensors.track("Qlz_24Wm_PageClick", {
        current_url: "/packageDB_chocolate/pages/index/index",
        page_name: "活动首页",
        button_name: "规则"
      })
    }
    const modalName = e.currentTarget.dataset.modalname;

    this.setData({
      [modalName]: true,
    });
  },
  async getShareParam() {
    await apiGetSendCode({
      data: {
        cardId: shareCardId,
      },
    });

    return {
      path: `/packageDB_chocolate/pages/sharepage/index?shareType=send&cardId=${shareCardId}&inviteCode=${inviteCode}`,
      title: SHARE_TEXT.send,
      imageUrl: SHARE_IMG.send,
    };
  },

  // 分享
  onShareAppMessage(ops) {

    console.error("看看分享", ops)
    if (shareType == 'normal') {
      return {
        title: SHARE_TEXT.normal,
        path: '/packageDB_chocolate/pages/index/index',
        imageUrl: SHARE_IMG.normal
      }
    } else if (shareType == 'send') {

      const promise = this.doSend();

      return {
        path: `/packageDB_chocolate/pages/sharepage/index?shareType=send&cardId=${shareCardId}&inviteCode=${inviteCode}`,
        title: SHARE_TEXT.send,
        // title: "66666",
        imageUrl: SHARE_IMG.send,
        promise
      }
    } else {
      console.error('want');

      const promise = this.getWantShare();

      // wx.hideLoading();
      console.error(inviteCode)
      return {
        path: `/packageDB_chocolate/pages/sharepage/index?shareType=want&cardId=${shareCardId}&inviteCode=${inviteCode}`,
        title: SHARE_TEXT.want,
        // title: "777777",
        imageUrl: SHARE_IMG.want,
        promise,
      };


    }

  },
  checkActivityTime() {
    if (this.data.systemTime < this.data.actStartTime) {
      // 活动未开始 不判断
    }
    if (this.data.systemTime > this.data.actEndTime) {
      // 活动已结束
      wx.showToast({
        title: "活动已结束，感谢您的关注～",
        icon: "none"
      });
      return false;
    }
    return true;
  },
  click_rule() { },
  async click_prize() {
    if (!isLogin()) {
      await this.doAuth();
      return
    }
    sensors.track("Qlz_24Wm_PageClick", {
      current_url: "/packageDB_chocolate/pages/index/index",
      page_name: "活动首页",
      button_name: "奖品"
    })
    wx.navigateTo({
      url: "/packageDB_chocolate/pages/prizePage/prizePage",
    });
  },
  // 相机识别
  click_camera() {
    sensors.track("Qlz_24Wm_PageClick", {
      current_url: "/packageDB_chocolate/pages/index/index",
      page_name: "活动首页",
      button_name: "相机识别"
    })
    // 扫码
    if (!this.checkActivityTime()) {
      return;
    }
    this.startOcr()
  },
  // 点击输入框
  async click_input() {
    if (!isLogin()) {
      await this.doAuth();
      return
    }
    // 取中锚点
    this.setData({
      isScroll: false,
      maList: ["", "", "", "", "", "", "", "", ""],
      inputID: 0,
      paddingleft: 0
    });
  },
  bindblur() {
    this.setData({
      isScroll: true,
      paddingleft: 0,
      inputID: 9
    });
  },
  bindKeyInput(e) {
    if (!this.checkActivityTime()) return
    console.log(e)
    // return
    const reg = /^[0-9a-zA-Z]*$/;
    if (e.detail.keyCode == 8) {
      if (this.data.inputID == 0) {
        return
      }
      let list = this.data.maList;
      list[(this.data.inputID - 1)] = "";
      this.setData({
        maList: list,
        inputInfo: "",
        paddingleft: 70 * (this.data.inputID - 1),
        inputID: --this.data.inputID,
      })
      return
    }
    if (e.detail.value && e.detail.value.length > 1) {
      let arr = e.detail.value.split("")
      for (let i = 0; i < arr.length; i++) {
        if (reg.test(arr[i])) {

        } else {
          let list = this.data.maList;
          list[this.data.inputID] = "";
          this.setData({
            maList: list,
            inputInfo: ""
          })
          console.log(list);
          return
        }
      }
      let list = this.data.maList;
      let num = this.data.inputID
      if (num + arr.length > 9) {
        for (let n = 0; n < 9 - num; n++) {
          list[num + n] = arr[n];
        }
      } else {
        arr.map((item, index) => {
          list[num + index] = item;
        })
      }
      // list[this.data.inputID] = e.detail.value;
      console.log(list);
      this.setData({
        maList: list,
        inputInfo: "",
        paddingleft: 70 * (num + arr.length),
        inputID: num + arr.length,

      }, async () => {
        console.log(this.data.inputID, "this.data.inputID")
        if (this.data.inputID >= 9) {
          let idNum = this.data.maList.indexOf("")
          if (idNum != -1) {
            console.log(idNum, "setData")
            this.setData({
              paddingleft: 70 * idNum,
              inputID: idNum,
            })
            return
          }
          let code = ""
          for (let i = 0; i < this.data.maList.length; i++) {
            code = code + this.data.maList[i]
          }

          let res = await apiReceiveCode({
            data: {
              code: code
            }
          })
          sensors.track("Qlz_24Wm_PageClick", {
            current_url: "/packageDB_chocolate/pages/index/index",
            page_name: "活动首页",
            button_name: "手动输入",
            bqm_id: code,
            is_verification_success: res.success,
            is_reached_verification_limit: this.data.scanLimitFlag
          })
          if (!res.success) {
            wx.showToast({
              title: res.message,
              icon: "none"
            })
            return
          }
          this.setData({
            maList: ["", "", "", "", "", "", "", "", ""],
            inputID: 9,
            getcardandquanInfo: res.data.cardVo
          })
        }
      });
      return
    }

    if (reg.test(e.detail.value) && e.detail.value && e.detail.value.length == 1) {
      //输入内容规范
      console.log("_+_+_+_+_+_+", e.detail.value)
    } else {
      //输入内容非法，进行提示
      let list = this.data.maList;
      list[this.data.inputID] = "";
      this.setData({
        maList: list,
        inputInfo: ""
      })
      console.log(list);
      return
    }
    let list = this.data.maList;
    list[this.data.inputID] = e.detail.value;
    console.log(list);
    this.setData({
      maList: list,
      inputInfo: "",
      paddingleft: 70 * (this.data.inputID + 1),
      inputID: ++this.data.inputID,

    }, async () => {
      if (this.data.inputID >= 9) {
        let idNum = this.data.maList.indexOf("")
        if (idNum != -1) {
          console.log(idNum, "setData")
          this.setData({
            paddingleft: 70 * idNum,
            inputID: idNum,
          })
          return
        }
        let code = ""
        for (let i = 0; i < this.data.maList.length; i++) {
          code = code + this.data.maList[i]
        }

        let res = await apiReceiveCode({
          data: {
            code: code
          }
        })
        sensors.track("Qlz_24Wm_PageClick", {
          current_url: "/packageDB_chocolate/pages/index/index",
          page_name: "活动首页",
          button_name: "手动输入",
          bqm_id: code,
          is_verification_success: res.success,
          is_reached_verification_limit: this.data.scanLimitFlag
        })
        if (!res.success) {
          wx.showToast({
            title: res.message,
            icon: "none"
          })
          return
        }
        this.setData({
          maList: ["", "", "", "", "", "", "", "", ""],
          inputID: 9,
          getcardandquanInfo: res.data.cardVo
        })
      }
    });
  },
  click_redbag() {
    sensors.track("Qlz_24Wm_PageClick", {
      current_url: "/packageDB_chocolate/pages/index/index",
      page_name: "活动首页",
      button_name: "红包领取",
    })
  },
  // 二重惊喜
  click_Guafen() {
    wx.navigateTo({
      url: "/packageDB_chocolate/pages/carveup/index",
    });
  },
  // 三重惊喜
  click_Go() {
    if (!this.checkActivityTime()) {
      return;
    }
    // 扫码
  },
  // 关闭瓜分弹窗
  modalClose() {
    this.setData({
      dividePop: null,
    });
  },
  // 关闭获得扫码奖励弹窗
  modalClose2() {
    this.setData({
      cardPrizeInfo: null,
    });
  },
  // 关闭获得2元立减金中奖弹窗
  modalClose3() {
    this.setData({
      getMoneyPrizePop: null,
    });
  },
  // 关闭赠卡二次确认弹窗
  modalClose4() {
    console.log("@!@!@!@!@!!@!!@!@2")
    this.setData({
      sendCardConfirmInfo: null,
    });
  },
  // 关闭签码获得奖励弹窗
  modalClose5() {
    this.setData({
      getcardandquanInfo: null,
    }, () => {
      this.getHomeInfo()
    });
  },

  // 生成索卡链接
  async createWantLink(e) {
    if (!isLogin()) {
      await this.doAuth();
      return
    }
    console.log("生成索卡链接", e.currentTarget.dataset.card.spId)

    shareType = 'want'
    let cardId = e.currentTarget.dataset.card.spId
    shareCardId = cardId;


    // wx.showShareMenu();

    // this.setData({
    //   shareLink: `/packageDB_chocolate/pages/sharepage/index?shareType=send&cardId=${cardId}&inviteCode=${res.data?.code}`,
    //   shareTitle: SHARE_TEXT.want,
    //   shareImg: SHARE_IMG.want,
    //   shareType: "want",
    // });

    console.error("kianjie", this.data.shareLink)

  },

  async getWantShare() {
    const res = await apiGetWantCode({
      data: {
        cardId: shareCardId,
      },
    });

    if (!res || !res.success || !res.data) return;

    inviteCode = res.data.code;

    return {
      path: `/packageDB_chocolate/pages/sharepage/index?shareType=want&cardId=${shareCardId}&inviteCode=${inviteCode}`,
      title: SHARE_TEXT.want,
      imageUrl: SHARE_IMG.want,
    };
  },

  // 赠送haoyou
  async beggerYou(e) {

    if (!isLogin()) {
      await this.doAuth();
      return
    }
    const sendCardConfirmInfo = e.currentTarget.dataset.card


    if (sendCardConfirmInfo.spCount == 0) {
      setwx.showToast({
        title: '卡片数量不足',
        icon: 'none'
      })
      return
    }
    shareType = 'send'

    shareCardId = sendCardConfirmInfo.spId

    // await this.doSend(sendCardConfirmInfo.spId);

    this.setData({
      sendCardConfirmInfo: {
        cardId: sendCardConfirmInfo.spId,
        cardImg: CARD_ID[sendCardConfirmInfo.spId],
        cardName: CARD_ID[sendCardConfirmInfo.spName]
      }
    })
  },

  // 点击赠卡
  async doSend() {

    const res = await apiGetSendCode({
      data: {
        cardId: shareCardId,
      },
    });

    // shareCardId = cardId;

    if (!res || !res.success || !res.data) return;

    inviteCode = res.data.code


    this.modalClose4()
    return {
      path: `/packageDB_chocolate/pages/sharepage/index?shareType=send&cardId=${shareCardId}&inviteCode=${inviteCode}`,
      title: SHARE_TEXT.send,
      // title: "66666",
      imageUrl: SHARE_IMG.send,
      // promise,
    }


  },

  // 判断登陆的流程
  judgeLogin() {
    // if (!isLogin()) {
    //   await this.selectComponent("#auth").auth();
    // }

    // await this.doAuth();
    // await this.getHomeInfo();

    this.closeModal('showNewGuide');


  },


  // 设置卡片信息
  setCardInfo(e) {

    const cardVo = e.detail.cardVo

    this.setData({
      getcardandquanInfo: cardVo
    })
  },

  // 赠卡 索卡判定
  async doAssist(type, id, cardId) {
    // console.log("&*&*&*&**&*&",Number(cardId.split("_")[2] )- 1 + 5)
    this.setData({
      currentId: (Number(cardId.split("_")[2]) + 5) % 6
    })
    wx.createSelectorQuery().select('#homePage').boundingClientRect(function (rect) {
      console.log('rectheight', rect.height);
      /* 将页面移动到最底部（用xxx的height定位） */
      wx.pageScrollTo({
        scrollTop: rect.height,
        duration: 1,
        success: (res) => {
          console.log("success", res)
        },
        fail: (res) => {
          console.log("fail", res)
        },
      })
      console.log(rect)
    })
      .exec()
    let res;

    console.error("iadjdahkfjd====", id);

    if (type == 'send') {
      res = await apiGetCardBySend({
        data: {
          code: id
        }
      })
      console.error("wisgi send===>>>>>")
    } else {
      res = await apiGetCardByWant({
        data: {
          code: id
        }
      })
    }

    console.error("wisgiwant===>>>>>")

    if (!res || !res.success || !res.data) {
      console.error("当前未获得该巧卡，快去扫棒签码吧～", type, res.success, res.message)
      // if (type == 'want') {
      setTimeout(() => {
        wx.showToast({
          title: res.message,
          duration: 2000,
          icon: 'none'
        })
      }, 1000)
      // } else if(res.code == '3012') {
      //   wx.showToast({
      //     title: '该卡片数量只有一张，无法赠送给好友～',
      //     duration: 2000,
      //     icon: 'none'
      //   })
      // }

      // } else if(code ==)

      // if()
      // await this.getHomeInfo();
      return
    }
    console.log("&*&*&*&**&*&")

    if (type == 'send') {
      setTimeout(() => {
        wx.showToast({
          title: '领取成功，快去收集更多巧卡吧～',
          icon: 'none',
          duration: 2000
        })
      }, 1000)

    } else {
      setTimeout(() => {
        wx.showToast({
          title: '赠送成功～',
        })
      }, 1000)

    }
    // await this.getHomeInfo();

  },
  click_box3() {
    if (!this.checkActivityTime()) {
      return
    }
    sensors.track("Qlz_24Wm_BannerClick", {
      current_url: "/packageDB_chocolate/pages/index/index",
      page_name: "活动首页",
      banner_name: "码上参与",
      banner_id: 1, //"扫码banner",
      button_name: "码上参与"
    })
    this.startOcr()
  },

  // 相机识别
  async startOcr() {
    if (!isLogin()) {
      await this.doAuth();
      return
    }
    console.error("xiangji");
    // 相机引导
    const hasGuide = wx.getStorageSync('photoGuide');
    console.log('hasGuide', hasGuide, !hasGuide)
    if (!hasGuide) {
      this.setData({
        showPhotoGuide: true
      })
    } else {
      this.setData({
        showTakePhoto: true
      })
    }

  },

  // 打开识别弹窗
  showTakePhoto() {
    this.setData({
      showTakePhoto: true
    })
  },

  // 前往大转盘页面
  async handleClickDraw() {
    if (!isLogin()) {
      await this.doAuth();
      return
    }
    sensors.track("Qlz_24Wm_PageClick", {
      current_url: "/packageDB_chocolate/pages/index/index",
      page_name: "活动首页",
      button_name: "大转盘icon",
    })
    wx.navigateTo({
      url: '/packageDB_chocolate/pages/turntablePage/turntablePage',
    })
  },

  // 设置卡片信息
  setPrizeInfo(e) {
    const cardVo = e.detail?.cardVo;
    const prizeVo = e.detail?.prizeVo
    this.setData({
      cardVo,
      prizeVo
    })

    // todo设置中奖弹窗弹出
  },

  // 去瓜分页面
  async toCarveupPage() {
    if (!isLogin()) {
      await this.doAuth();
      return
    }

    sensors.track("Qlz_24Wm_BannerClick", {
      current_url: "/packageDB_chocolate/pages/index/index",
      page_name: "活动首页",
      banner_name: "瓜分banner",
      banner_id: 0, //"瓜分banner",
      button_name: "瓜分banner"
    })
    wx.navigateTo({
      url: '/packageDB_chocolate/pages/carveup/index',
    })
  },
  async doLogin() {
    if (!isLogin()) {
      await this.doAuth();
      return
    }
  },
  // 保存图片
  // saveImage(data){
  //   console.log(data.currentTarget.dataset.item.spId)
  //   let id = data.currentTarget.dataset.item.spId
  //   console.log(CARD_ID[id]);
  //   wx.previewImage({
  //     urls: [CARD_ID[id]],
  //     current: CARD_ID[id]
  //   })
  // },
  saveImage(data) {
    wx.getSetting({
      success: function (res) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success: function (res) {
            console.log("授权成功");
            var imgUrl = CARD_ID[data.currentTarget.dataset.item.spId];
            wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
              url: imgUrl,
              success: function (res) {
                console.log(res, "下载成功")
                // 下载成功后再保存到本地
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
                  success: function (res) {
                    wx.showToast({
                      title: '成功保存到相册',
                      icon: 'success'
                    })
                  }
                })
              },
              fail: function (res) {
                console.log(res, "下载失败")
              }
            })
          }
        })
      }
    })

  }


})
