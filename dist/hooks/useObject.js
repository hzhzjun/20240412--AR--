import { isArray, isHaveValue } from './useValidate';
export function useClone(val) {
  if (Object.prototype.toString.call(val) === '[object Object]') {
    const obj = {};
    for (const key in val) {
      obj[key] = useClone(val[key]);
    }
    return obj;
  } else if (isArray(val))
    return val.map(item => useClone(item));
  else
    return val;
}
export function useValue(object) {
  if (Object.prototype.toString.call(object) === '[object Object]') {
    const obj = {};
    for (const key in object) {
      const value = useValue(object[key]);
      if (isHaveValue(value))
        obj[key] = value;
    }
    return obj;
  } else if (isArray(object))
    return object.map(item => useValue(item));
  else
    return object;
}
