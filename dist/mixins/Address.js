import { listAddress } from '../api/member/address';
import { useTimeStamp } from '../hooks/useDate';
import { getCurrentPagesList } from '../hooks/useRouter';
import { isArray } from '../hooks/useValidate';
import { useStorage } from './../hooks/useStorage';
export default {
  listAddress(update = false) {
    return new Promise(async (resolve, reject) => {
      const that = this;
      try {
        let items = useStorage.addressList;
        if (!isArray(items) || !items.length || useTimeStamp() - (useStorage.addressListTimeStamp || useTimeStamp()) >= 1000 * 60 * 60)
          update = true;
        if (update) {
          items = [];
          const { data } = await listAddress();
          items = data;
        }
        const index = items.findIndex(item => item.defaultOption);
        let defaultAddress = {};
        if (items.length)
          defaultAddress = items[index === -1 ? 0 : index];
        that.setData({
          'address.items': items,
          'address.defaultAddress': defaultAddress
        });
        useStorage.addressList = items;
        if (update)
          useStorage.addListTimeStamp = useTimeStamp();
        const pages = getCurrentPagesList();
        pages.forEach((page, index) => {
          if (index !== pages.length - 1 && page.data.address && update) {
            if (typeof page.updateAddress === 'function') {
              page.updateAddress({
                items,
                defaultAddress: page.data.defaultAddress && page.data.defaultAddress.addressId ? undefined : defaultAddress
              });
            }
          }
        });
        resolve();
      } catch (error) {
        reject();
      }
    });
  },
  updateAddress({ items, defaultAddress, replace = false }) {
    const that = this;
    const changed = JSON.stringify(defaultAddress) !== JSON.stringify(that.data.address.defaultAddress);
    const setData = {};
    items && (setData['address.items'] = items);
    replace && defaultAddress && (setData['address.defaultAddress'] = defaultAddress);
    that.setData(setData);
    if (typeof that.handleUpdateAdress === 'function' && replace && changed)
      that.handleUpdateAdress();
  },
  getDefaultAddress(update = false) {
    return new Promise(async (resolve, reject) => {
      try {
        let items = useStorage.addressList;
        if (!isArray(items) || !items.length || useTimeStamp() - (useStorage.addressListTimeStamp || useTimeStamp()) >= 1000 * 60 * 60)
          update = true;
        if (update) {
          items = [];
          const { data } = await listAddress();
          items = data;
        }
        const index = items.findIndex(item => item.defaultOption);
        let defaultAddress = {};
        if (items.length)
          defaultAddress = items[index === -1 ? 0 : index];
        useStorage.addressList = items;
        if (update)
          useStorage.addListTimeStamp = useTimeStamp();
        resolve(defaultAddress);
      } catch (error) {
        reject();
      }
    });
  }
};
