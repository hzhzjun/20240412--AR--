import { useRequest } from '../../hooks/useRequest';
export function listAddress() {
    return new useRequest().request({
        url: '/member/address/list',
        method: 'GET',
        needLogin: true
    });
}
