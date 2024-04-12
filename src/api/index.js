import { generateAPI } from "./utils.js"

const API = generateAPI({
	/** 获取活动规则 */
	getRule: 'projectRule.query',
	/** 获取前端配置项 */
	getFrontVariable: 'coop_frontVariable.query',
	/** 参与接口 post请求 */
	doJoin: {
		uri: 'join.do',
		method: "post"
	},
	/** 签到 */
	doSign: {
		uri: 'checkin_1/doSign.do',
		withToken: true,  // 携带token
	},
})

// console.log('======', API)

export default API
