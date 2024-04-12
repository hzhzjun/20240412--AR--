import { useRequest } from '../../hooks/useRequest';
export function getWxcodeValue(code) {
    return new useRequest().request({
        url: '/commons/common/wechat/code/decrypt',
        method: 'GET',
        data: {
            code
        },
        showToast: false
    });
}
export function getWxcode(data) {
    return new useRequest().request({
        url: '/commons/common/wechat/code/get',
        method: 'POST',
        data: Object.assign(data, {
            envVersion: wx.getAccountInfoSync().miniProgram.envVersion
        }),
        showToast: false
    });
}
export function getSystemTime() {
    return new useRequest().request({
        url: '/commons/common/current/timestamp',
        method: 'GET',
        showToast: false
    });
}
