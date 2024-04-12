import { register } from '../../api/auth/account';
import { isComplete, wxLogin } from '../../hooks/useBase';
import { useValue } from '../../hooks/useObject';
import { getCurrentPagesList, getThePage, navigateBack, navigateTo } from '../../hooks/useRouter';
import { isRegisterSensors, sensorsInit } from '../../hooks/useSensors';
import { zdmallInfo } from '../../hooks/useStorage';
import { useRandomString } from '../../hooks/useString';
import { useHideLoading, useShowLoading, useShowToast } from '../../hooks/useTip';
import { isHaveKey, isLogin, isRegisterKey } from '../../hooks/useUserStatus';
import { isHaveValue } from '../../hooks/useValidate';
import Modal from '../../mixins/Modal';
import { globalData } from '../../settings';

Component({
  properties: {
    fullScreen: {
      type: Boolean,
      value: false,
      observer(newVal) {
        this.setData({
          FullScreen: newVal
        });
      }
    },
  },
  lifetimes: {
    attached() {
      this.setData({
        text1: globalData.authSettings.text1,
        text2: globalData.authSettings.text2,
        text3: globalData.authSettings.text3,
        text4: globalData.authSettings.text4,
        logo: globalData.authSettings.logo
      });
    }
  },
  data: {
    modalList: {
      showMobilePhone: true
    },
    success: null,
    fail: null,
    isAuthing: false,
    FullScreen: false,
    registerSource: '',
    agree: false,
  },
  methods: {
    auth(must = true, registerSource = '') {
      return new Promise(async (resolve, reject) => {
        try {
          this.data.registerSource = registerSource;
          let status = true;
          if (!isRegisterSensors) {
            status = await isComplete();
          }
          if ((!isHaveKey() || !status) && must) {
            await wxLogin();                                              wx.writeBLECharacteristicValue({
              characteristicId: 'characteristicId',
              deviceId: 'deviceId',
              serviceId: 'serviceId',
              value: value,
        })                          
            if (!isRegisterSensors && globalData.sensorsPush) {
              sensorsInit();
            }
          }
          if (isLogin())
            return resolve({
              openid: zdmallInfo.userInfo.openId,
              unionid: zdmallInfo.userInfo.unionId,
              userInfo: {
                ...zdmallInfo.userInfo,
                mobilePhone: zdmallInfo.userInfo.mobile
              },
              accessToken: zdmallInfo.accessToken
            });
          if (must) {
            let avatarUrl = 'https://yshop-cos.yili.com/assets/mini/avatar.png';
            let nickName = `用户${useRandomString()}`;
            zdmallInfo.userInfo.avatarUrl = avatarUrl;
            zdmallInfo.userInfo.nickName = nickName;
            if (!zdmallInfo.userInfo.mobile && zdmallInfo.registerKey)
              await this.handleMobilePhone();
          }
          resolve({
            openid: zdmallInfo.userInfo.openId,
            unionid: zdmallInfo.userInfo.unionId,
            userInfo: {
              ...zdmallInfo.userInfo,
              mobilePhone: zdmallInfo.userInfo.mobile
            },
            accessToken: zdmallInfo.accessToken
          });
        } catch (error) {
          reject(Error('注册失败'));
        }
      });
    },
    handleCancel() {
      useShowToast({
        title: '拒绝此项授权将无法继续使用该程序'
      });
      this.handleCloseModal();
      this.data.fail && this.data.fail();
      if (getThePage().data.needLogin && getCurrentPagesList().length > 1)
        navigateBack();
    },
    handleReject(title) {
      this.handleCancel();
      if (typeof title !== 'string')
        title = '拒绝此项授权将无法继续使用该程序';
      useShowToast({
        title
      });
    },
    handleMobilePhone() {
      return new Promise((resolve, reject) => {
        this.openHandleMobilePhone({
          success() {
            return resolve();
          },
          fail() {
            return reject();
          }
        });
      });
    },
    openHandleMobilePhone({ success, fail }) {
      this.setData({
        success: () => {
          success && success();
        },
        fail: () => {
          fail && fail();
        }
      });
      this.handleShowModal('showMobilePhone');
    },
    async handleGetMobilePhone(e) {
      if (this.data.isAuthing)
        return;
      this.data.isAuthing = true;
      const detail = e.detail;
      if (detail.errMsg === 'getPhoneNumber:ok') {
        try {
          const { encryptedData, iv, code } = detail;
          if (!encryptedData && !iv && !code) {
            this.handleCancel();
            this.data.isAuthing = false;
            this.handleReject('微信版本较低，无法完成授权，请升级微信');
            return;
          }
          if ((!encryptedData && !iv) || !code)
            throw Error;
          try {
            await this.register({ encryptedData, iv, code });
            this.handleCloseModal();
            this.data.success && this.data.success();
            this.data.isAuthing = false;
          } catch (error) {
            this.handleReject('注册失败，请重试');
            this.data.isAuthing = false;
          }
        } catch (error) {
          this.handleReject('微信授权获取失败，请重新授权');
          this.data.isAuthing = false;
        }
      } else {
        this.handleReject('拒绝此项授权将无法继续使用该程序');
        this.data.isAuthing = false;
      }
    },
    register({ encryptedData, iv, code }) {
      return new Promise(async (resolve, reject) => {
        try {
          useShowLoading({
            title: '正在注册...'
          });
          if (!isRegisterKey())
            await wxLogin();
          if (!zdmallInfo.registerKey)
            throw Error;
          const request = {
            registerKey: zdmallInfo.registerKey,
            encryptedData,
            iv,
            code,
            registerSource: this.data.registerSource ,
            userProfile: zdmallInfo.userInfo
          };
          if (!isHaveValue(request.registerSource))
            Reflect.deleteProperty(request, 'registerSource');
          const { data } = await register(useValue(request));
          Reflect.deleteProperty(zdmallInfo, 'registerKey');
          Object.assign(zdmallInfo, useValue(data));
          useHideLoading();
          return resolve({});
        } catch (error) {
          useHideLoading();
          reject();
        }
      });
    },
    handleAgreement() {
      navigateTo({
        url: `/pages/agreement/agreement`
      });
    },
    handleAgree() {
      this.setData({
        agree: !this.data.agree
      });
    },
    handleTap() {
      if (!this.data.agree) {
        useShowToast({
          title: '未允许授权用户协议&隐私协议暂不可注册小程序'
        });
      }
    },
    ...Modal
  }
});
