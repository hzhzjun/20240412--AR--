import { topPosition } from '../../hooks/useData';
import { useStyle, useUnit } from '../../hooks/useStyle';
import computedBehavior from '../../module/computed.js';
Component({
  behaviors: [computedBehavior],
  options: {
    multipleSlots: true
  },
  properties: {
    position: {
      type: String,
      value: 'center'
    },
    canClose: {
      type: Boolean,
      value: true
    },
    fullScreen: {
      type: Boolean,
      value: false
    },
    background: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 12
    }
  },
  computed: {
    style(data) {
      return (`backdrop-filter: ${data.background ? 'blur(3px)' : ''};` +
        useStyle({
          background: !data.background ? 'none' : '',
          zIndex: data.zIndex,
          justifyContent: data.position === 'top' ? 'flex-start' : data.position === 'bottom' ? 'flex-end' : 'center',
          top: data.fullScreen ? '0' : useUnit(topPosition, 'px')
        }));
    }
  },
  data: {},
  methods: {
    handleCloseModal() {
      if (!this.data.canClose)
        return;
      this.triggerEvent('close');
    },
    handleTouchmove() {
      return null;
    }
  }
});
