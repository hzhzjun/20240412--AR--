import { useStaticData } from '../../hooks/useData';
import computedBehavior from '../../module/computed.js';
Component({
  behaviors: [computedBehavior],
  properties: {
    global: {
      type: Boolean,
      value: false
    }
  },
  computed: {
    className(data) {
      const className = ['components-loading'];
      data.global && className.push('components-loading-global');
      return className.join(' ');
    }
  },
  data: {},
  methods: {}
});
