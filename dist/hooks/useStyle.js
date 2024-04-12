import { globalData } from '../settings';
import { useLineString } from './useString';
export function rpxToPx(rpx) {
  return Math.floor((globalData.systemInfo.screenWidth * rpx) / 750);
}
export function useStyle(obj) {
  const array = [];
  for (const key in obj) {
    if (typeof obj[key] === 'string' || typeof obj[key] === 'number') {
      let keys = useLineString(key);
      if (keys.startsWith('webkit'))
        keys = `-${keys}`;
      array.push(`${keys}: ${obj[key]}`);
    }
  }
  return array.join(';');
}
export function useUnit(value, unit = 'rpx') {
  if (typeof value === 'undefined' || !value.toString)
    return '';
  return /^-?\d+(\.\d+)?$/.test(value.toString()) ? value + unit : value.toString();
}
