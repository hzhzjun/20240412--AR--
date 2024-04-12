import { getThePage } from '../hooks/useRouter';
import { useHideTabBar, useShowTabBar } from '../hooks/useTabbar';
export default {
  handleCloseModal() {
    const that = this;
    const modalList = that.data.modalList;
    for (const key in modalList) {
      modalList[key] = false;
    }
    that.setData({
      showModal: false,
      modalList
    });
    if (!getThePage().data.showModal)
      useShowTabBar.call(that);
  },
  handleShowModal(modal) {
    const that = this;
    let callbackType = '';
    if (typeof modal === 'object') {
      callbackType = modal.currentTarget?.dataset.type || '';
      modal = modal.currentTarget?.dataset.modal;
    }
    useHideTabBar.call(that);
    that.setData({
      callbackType,
      showModal: true,
      [`modalList.${modal}`]: true
    });
  },
  onUnload() {
    const that = this;
    useShowTabBar.call(that);
  }
};
