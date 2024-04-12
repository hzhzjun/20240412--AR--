// packageDB_chocolate/components/getPrizePop/getPrizePop.js
import sensors from '../../../module/sensorsdata.min';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    moneyPrizeInfo:{
      optionImg:String,
      optionName:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
// 点击确定关闭
closeModal() {
  this.triggerEvent("myEvent");
  sensors.track("Qlz_24Wm_PopClick",{
    pop_name: '2元红包',
    button_name: '开心收下',
    pop_type:"红包",
    current_url:"/packageDB_chocolate/components/getPrizePop/getPrizePop.js",
    page_name:"活动首页",
  })
},
  }
})
