import { goUdeskContact } from '../../hooks/useMoudle';
import computedBehavior from '../../module/computed.js';
Component({
  behaviors: ['wx://form-field-button', computedBehavior],
  options: {
    multipleSlots: true
  },
  externalClasses: ['custom-class'],
  properties: {
    openType: {
      type: String,
      value: ''
    },
    styleName: {
      type: String,
      value: 'default'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    hollow: {
      type: Boolean,
      value: false
    },
    formType: {
      type: String,
      value: ''
    },
    customStyle: {
      type: String,
      value: ''
    },
    showBorder: {
      type: Boolean,
      value: true
    },
    groupId: {
      type: String,
      value: ''
    }
  },
  computed: {
    className(data) {
      const className = ['components-button'];
      className.push(`components-button-${data.styleName}`);
      data.hollow && className.push('components-button-hollow');
      data.disabled && className.push('components-button-disabled');
      return className;
    }
  },
  data: {},
  methods: {
    getuserinfo(e) {
      this.triggerEvent('getuserinfo', e.detail);
    },
    getphonenumber(e) {
      this.triggerEvent('getphonenumber', e.detail);
    },
    handleTap() {
      if (this.data.openType === 'login')
        this.triggerEvent('login');
      else if (this.data.openType === 'udesk')
        goUdeskContact({ target: '_udesk', groupId: this.data.groupId });
    }
  }
});
