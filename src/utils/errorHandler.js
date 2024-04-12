/** @Author: all
 * @Date: 2022-04-12 11:26:44
 **/

import { Toast } from "@spark/ui";
import { DEFAULT_NET_ERROR } from "./constants";

// 需要过滤的错误码
export const filterCode = ["600002"];

export const errMessageMap = {
  1020: "活动未开始",
  1021: "活动已结束",
  1007: "活动太火爆了，奖品已抢完咯～",
};

/**
 * 统一错误处理
 * @param e
 */
export function errorHandler(e) {
  if ((e.code == 0 && e.message == "请稍后再试") || filterCode.indexOf(`${e.code}`) >= 0) return;
  switch (e.code) {
    default: {
      const msg = errMessageMap[e.code] || e.message || DEFAULT_NET_ERROR;
      Toast(msg, 2000, { hideOthers: true });
      break;
    }
  }
}
