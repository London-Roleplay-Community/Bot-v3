/* eslint-disable @typescript-eslint/no-explicit-any */
export function getKeyByValue(object: Record<any,any>, value: any) {
  return Object.keys(object).find(k => object[k] === value)
}

/** @deprecated Useless; use object[k] instead */
export function getValueByKey(object: Record<any,any>, key: any) {
  return object[key]
}