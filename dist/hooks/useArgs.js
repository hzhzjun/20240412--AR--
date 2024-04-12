export function useValidateArgs(args, required = true) {
  return new Promise((resolve, reject) => {
    const arg = this.options[args];
    if (arg && typeof arg === 'string')
      return resolve(arg);
    if (required) {
      this.setData({
        loading: false,
        fail: true,
        failContent: '页面缺少必要参数',
        failButtonContent: '返回',
        failRouterBack: true
      });
      return reject();
    } else
      return resolve(undefined);
  });
}
export function useArgsUrl(url) {
  const [, search] = url.split('?');
  if (!search)
    return {};
  const obj = {};
  const query = search.split('&');
  query.forEach(item => {
    const [key, value] = item.split('=');
    obj[key] = decodeURIComponent(value);
  });
  return obj;
}
export function useArgsObj(obj) {
  let url = '';
  for (const key in obj) {
    url += (url ? '&' : '') + `${key}=${obj[key]}`;
  }
  return url;
}
