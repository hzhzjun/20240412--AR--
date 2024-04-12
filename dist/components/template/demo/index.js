Component({
  properties: {
    /** 组件数据 */
    data: {
      type: Object,
      value: {}
    },
    /** 当前组件可用到的总体宽度 */
    fullWidth: {
      type: Number,
      value: 0
    }
  },
  lifetimes: {
    attached() {
      this.triggerEvent('render')
    }
  },
  data: {},
  methods: {
    /** 组件点击事件 */
    handleClick() {
      // 数据埋点示例
      this.triggerEvent('click', [{
        // element_type 组件类型名称
        element_type: '按钮',
        // component 组件完整数据
        component: this.data.data,
        // clickComponent 按神策要求的其它详情数据
        clickComponent: {
          /** 组件别名-实际运营配置的名称 */
          element_alias: '未命名',
          /** 元素类型-图片pic、按钮button、视频video */
          $element_type: '',
          /** 图片名称-图片名称或者子元素名称 */
          picture_name: '',
          /** 元素图片服务器地址 */
          element_server_address: '',
        },
        // event 事件类型, '点击tap' | '长按hold' | '滑动slider'
        event: '点击tap'
      }])
    }
  }
});
