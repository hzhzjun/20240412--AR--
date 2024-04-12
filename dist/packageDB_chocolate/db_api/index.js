import requestFun from "./requestFun";
import {
  dbLoginParam,
  dbCoopIndex,
  dbLogExposure,
  dbLogClick,
  dbCarveUpIndex,
  dbcarveUpDetails,
  dbInviteDetails,
  dbGiveCard,
  dbReceiveCard,
  vertifyStick,
  uploadFile,
  getWantCode,
  getSendCode,
  queryUserSps,
  recordQuery,
  exchange,
  compound,
  getCardBySend,
  sendCardByWant,
  getInviteCode,
  doAssist,
  inputReceiveCode,
  getTurntableInfoParam,
  drawTurntableParam,
  getTurntableRuleParam,
  dbH5LoginParam
} from "./dbrequest";
import {
  globalDBData
} from "../util/util";

// 小程序授权登陆
export const reqDbLogin = (param) => {
  return requestFun({
    ...param,
    ...dbLoginParam
  })
};

/**首页接口 */
export const apiCoopIndex = (param) => {
  dbCoopIndex.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...dbCoopIndex
  })
}
/**三重礼首页接口 */
export const apiCarveUpIndex = (param) => {
  dbCarveUpIndex.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...dbCarveUpIndex
  })
}
/**瓜分明细接口 */
export const apiCarveUpDetails = (param) => {
  dbcarveUpDetails.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...dbcarveUpDetails
  })
}
/**邀请明细接口 */
export const apiInviteDetails = (param) => {
  dbInviteDetails.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...dbInviteDetails
  })
}
/**赠送卡 */
export const apiGiveCard = (param) => {
  dbInviteDetails.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...dbGiveCard
  })
}
/**领取卡 */
export const apiReceiveCard = (param) => {
  dbInviteDetails.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...dbReceiveCard
  })
}

/** 识别棒签 */
export const apiVertifyStick = (param) => {
  vertifyStick.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...vertifyStick
  })
}

/** 上传图片 */
export const apiUploadFile = (param) => {
  uploadFile.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...uploadFile
  })
}

/** 获取索卡码 */
export const apiGetWantCode = (param) => {
  getWantCode.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...getWantCode
  })
}

/** 获取赠卡码 */
export const apiGetSendCode = (param) => {
  getSendCode.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...getSendCode
  })
}

/** 领取卡 */
export const apiGetCardBySend = (param) => {
  getCardBySend.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...getCardBySend
  })
}

/** 赠送卡 */
export const apiGetCardByWant = (param) => {
  sendCardByWant.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...sendCardByWant
  })
}

/** 获取邀请码 */
export const apiGetInviteCode = (param) => {
  getInviteCode.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...getInviteCode
  })
}

/** 助力 */
export const apiDoAssit = (param) => {
  doAssist.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...doAssist
  })
}

/** 埋点曝光 */
export const logExposure = (param) => {
  return requestFun({
    data: {
      ...param,
      dcm: '202.' + globalDBData.projectxID + '.0.0',
      domain: `//embedlog.duiba.com.cn`,
      appId: globalDBData.appID
    },
    ...dbLogExposure
  })
}

/** 埋点点击 */
export const logClick = (param) => {
  return requestFun({
    data: {
      ...param,
      dcm: '202.' + globalDBData.projectxID + '.0.0',
      domain: '//embedlog.duiba.com.cn',
      appId: globalDBData.appID
    },
    ...dbLogClick
  })
}
// 道具接口
export const apiqueryUserSps = (param) => {
  queryUserSps.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...queryUserSps
  })
}

// 查询奖品接口
export const apirecordQuery = (param) =>{
  recordQuery.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...recordQuery
  })

}
// 兑换卡片接口
export const apiExchange = (param) =>{

  exchange.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...exchange
  })

}
// 合成卡片
export const apiCompound = (param) =>{

  compound.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...compound
  })

}
// 手动输入棒签码
export const apiReceiveCode =  (param) =>{

  inputReceiveCode.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...inputReceiveCode
  })

}

/** 大转盘首页 */
export const getTurntableInfo = (param) => {
  getTurntableInfoParam.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...getTurntableInfoParam
  })
}

/** 大转盘抽奖 */
export const drawTurntable = (param) => {
  drawTurntableParam.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...drawTurntableParam
  })
}

/** 大转盘规则 */
export const getTurntableRule = (param) => {
  getTurntableRuleParam.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...getTurntableRuleParam
  })
}

/** 兑吧h5免登 */
export const dbH5Login = (param) => {
  dbH5LoginParam.header.loginToken = globalDBData.loginToken
  return requestFun({
    ...param,
    ...dbH5LoginParam
  })
}