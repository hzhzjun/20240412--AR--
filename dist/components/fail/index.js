import { navigateBack } from '../../hooks/useRouter';
Component({
  properties: {
    content: {
      type: String,
      value: '小程序发生了一些未知错误',
      observer: function(newVal) {
        if (typeof newVal !== 'string' || newVal === '') {
          this.setData({
            content: '小程序发生了一些未知错误'
          });
        }
      }
    },
    buttonContent: {
      type: String,
      value: '重新加载',
      observer: function(newVal) {
        if (typeof newVal !== 'string' || newVal === '') {
          this.setData({
            buttonContent: '重新加载'
          });
        }
      }
    },
    routerBack: {
      type: Boolean,
      value: false
    }
  },
  data: {},
  methods: {
    reLoad(e) {
      if (this.data.routerBack)
        navigateBack();
      else
        this.triggerEvent('reload', e.detail);
    }
  }
});
