import { useRequest } from '../../hooks/useRequest';
export function isNewMember(data) {
    return new useRequest().request({
        url: '/member/verify',
        method: 'POST',
        data,
        needLogin: true,
        showToast: false
    });
}
