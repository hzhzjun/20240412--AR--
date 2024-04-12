import { PAGE_MAP } from '@src/utils/constants';
import { makeAutoObservable } from 'mobx';
import API from '../api/index';
import { GetCurrSkinId, getCustomShareId } from "@src/utils/utils";

const skinId = GetCurrSkinId() || getCustomShareId();

const store = makeAutoObservable({
  /** 活动规则 */
  ruleInfo: '',

  /** 前端开发配置 */
  frontVariable: {},

  /** 当前页面 */
  curPage: {
    // TODO 举例子，自定义页面，因为mng更新原因原数字id会对应一个新的字符串id
    "5055": "sharePage",
    Did1NDA0NDc: "sharePage",

    myPrize: "myPrize", // TODO 举例子 新宿台奖品页
    index: PAGE_MAP.LOADING_PAGE,
  }[skinId] || PAGE_MAP.LOADING_PAGE,

  pageData: {},

  /** 场景切换 */
  changePage(page, data = {}) {
    this.pageData = data;
    this.curPage = page;
  },

  /** 获取活动规则 */
  async initRule() {
    // 模拟获取远程的数据
    const { data } = await API.getRule();
    this.ruleInfo = data;
  },

  /** 获取前端配置项 */
  async getFrontVariable() {
    // 获取前端开发配置
    const { data } = await API.getFrontVariable();
    this.frontVariable = data || {};
    console.log('前端开发配置', data)
  }
})
export default store;
