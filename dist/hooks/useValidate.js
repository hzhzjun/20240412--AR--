export function isDate(str) {
  return /^\d{4}(-\d{1,2}){2}( \d{1,2}(:\d{1,2}){2})?$/.test(str);
}
export function isHaveValue(value) {
  return !(typeof value === 'undefined' ||
    value === null ||
    (typeof value === 'number' && isNaN(value)) ||
    (typeof value === 'string' && (value.trim() === '' || value.trim() === 'undefined')));
}
export function isCode(str) {
  return /^[\d\w]{32}$/.test(str);
}
export function isArray(arg) {
  return Array.isArray(arg);
}
