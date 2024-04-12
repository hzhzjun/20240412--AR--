import {
  globalDBData
} from "../util/util"

const app = getApp()

// 正式环境需检查 todo
const __env__ = 'online'

const dbDomains = {
  'online': "https://activity-6.m.duiba.com.cn",
  'pre': "https://activity-pre.m.duiba.com.cn",
  'test': "https://activity.m.duibatest.com.cn",
  'dev': "https://docs.dui88.com/mock/1740/1"
}

const dbDomainPaths = {
  'online': dbDomains['online'] + "/projectx/pa9aa12ab",
  'pre': dbDomains['online'] + "/projectx/pd173e66b",
  'test': dbDomains['test'] + "/projectx/pe20ff3fe",
  'dev': "https://docs.dui88.com/mock/1740/1"
}

const exposurePaths = {
  'online': 'https://embedlog.duiba.com.cn/exposure/standard',
  'pre': 'https://embedlog.duiba.com.cn/exposure/standard',
  'test': 'https://embedlog.duibatest.com.cn/exposure/standard',
  'dev': 'https://embedlog.duibadev.com.cn/exposure/standard',
}

/**小程序接口 */
export const dbDomain = dbDomains[__env__]
/**活动接口 */
export const apiDbDomain = dbDomainPaths[__env__]
/** 埋点接口 */
export const mdDomain = exposurePaths[__env__]


// 小程序授权登陆
export const dbLoginParam = {
  url: dbDomain + "/wechat/chocliz/autoLogin",
  method: "POST",
  header: {
    "Content-Type": 'application/x-www-form-urlencoded'
  }
}

/**首页接口 */
export const dbCoopIndex = {
  url: apiDbDomain + "/home/coop_index.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}

/**三重礼首页接口 */
export const dbCarveUpIndex = {
  url: apiDbDomain + "/three/coop_divideIndex.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}

/**邀请明细接口 */
export const dbInviteDetails = {
  url: apiDbDomain + "/inviteAssist_1/coop_queryInviteRecords.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}

/**赠送卡 */
export const dbGiveCard = {
  url: apiDbDomain + "/askCard/coop_giveCard.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}

/**领取卡 */
export const dbReceiveCard = {
  url: apiDbDomain + "/giveCard/coop_receiveCard.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}


/**瓜分明细接口 */
export const dbcarveUpDetails = {
  url: apiDbDomain + "/three/coop_divideHistory.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}

/** 棒签识别接口 */
export const vertifyStick = {
  url: apiDbDomain + "/home/coop_scanReceiveCode.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}

/** 上传图片 */
export const uploadFile = {
  url: dbDomain + "/customActivity/duiba/imgUploadUrl",
  method: "POST",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}

/** 获取索卡码 */
export const getWantCode = {
  url: apiDbDomain + "/askCard/coop_getAskCode.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}

/** 获取赠卡码 */
export const getSendCode = {
  url: apiDbDomain + "/giveCard/coop_getGiveCode.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}


/** 领取卡 */
export const getCardBySend = {
  url: apiDbDomain + "/giveCard/coop_receiveCard.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}

/** 赠卡 */
export const sendCardByWant = {
  url: apiDbDomain + "/askCard/coop_giveCard.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}

/** 获取邀请码 */
export const getInviteCode = {
  url: apiDbDomain + "/inviteAssist_1/coop_getInviteCode.do",
  method: "POST",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}

/** 助力 */
export const doAssist = {
  url: apiDbDomain + "/inviteAssist_1/coop_doAssist.do",
  method: "POST",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}
  
//  dpm: `${appId}.110.${idx}.1`,
//  dom: `${MD_CHANNEL[CFG.channel]}.0.0.0`,
/** 曝光埋点 */
export const dbLogExposure = {
  url: mdDomain,
}

/** 点击埋点 */
export const dbLogClick = {
  url: dbDomain + '/log/click'
}
// 查询道具
export const queryUserSps = {
  url: apiDbDomain + "/collectSp_1/coop_queryUserSps.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}
// 查询用户中奖记录
export const recordQuery = {
  url: apiDbDomain + "/home/coop_recordQuery.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}
// 兑换卡片接口
export const exchange = {
  url: apiDbDomain + "/collectSp_1/coop_exchange.do",
  method: "POST",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}
// collectSp_1/coop_compound.do
export const compound = {
  url: apiDbDomain + "/collectSp_1/coop_compound.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}
// 手动输入棒签码
export const inputReceiveCode = {
  url: apiDbDomain + "/home/coop_fillInReceiveCode.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}
// 大转盘首页
export const getTurntableInfoParam = {
  url: apiDbDomain + "/turntable/coop_turntableIndex.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}
// 大转盘抽奖
export const drawTurntableParam = {
  url: apiDbDomain + "/turntable/coop_join.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}
// 大转盘规则
export const getTurntableRuleParam = {
  url: apiDbDomain + "/projectRule.query",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}

/** 兑吧h5免登 */
export const dbH5LoginParam = {
  url: apiDbDomain + "/home/coop_autoLogin.do",
  method: "GET",
  header: {
    "Content-Type": 'application/json',
    "loginToken": globalDBData.loginToken
  }
}