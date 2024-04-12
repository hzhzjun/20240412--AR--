import { useRequest } from '../../hooks/useRequest';
export function login(data) {
    return new useRequest().request({
        url: '/auth/account/login',
        data,
        method: 'POST',
        needLogin: false
    });
}
export function register(data) {
    return new useRequest().request({
        url: '/auth/account/register',
        data,
        method: 'POST',
        needLogin: false
    });
}
export function logout() {
    return new useRequest().request({
        url: '/auth/account/logout',
        method: 'POST',
        needLogin: false
    });
}
export function getAuthCode(data) {
    return new useRequest().request({
        url: '/oauth2/buyer/authorize',
        data,
        module: 'oauth2',
        method: 'GET',
        needLogin: true
    });
}
