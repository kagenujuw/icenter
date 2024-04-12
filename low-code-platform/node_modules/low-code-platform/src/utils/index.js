/**
 * 生成唯一的ID值
 */
const getuuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * 判断一个对象是不是纯粹的对象
 * @param {*} val 
 * @returns 
 */
const isPlainObject = (val) => {
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const isPlainObject = (val) => toTypeString(val) === '[object Object]';
  return isPlainObject
}

/**
 * 转数字
 * @param {*} val 
 * @returns 
 */
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};


// 前文中 有 isObject 判断是不是对象了。
// isPlainObject 这个函数在很多源码里都有，比如 jQuery 源码和 lodash 源码等，具体实现不一样



/**
 * 深拷贝
 * @param {*} obj 
 * @returns 
 */
const deepClone = (obj) => {
  const _toString = Object.prototype.toString

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  // DOM Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true)
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime())
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    const flags = []
    if (obj.global) { flags.push('g') }
    if (obj.multiline) { flags.push('m') }
    if (obj.ignoreCase) { flags.push('i') }

    return new RegExp(obj.source, flags.join(''))
  }

  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

  for (const key in obj) {
    result[key] = deepClone(obj[key])
  }

  return result
}

const combineComponent = (allComponent) => {
  const componentArr = [
    ...allComponent.inputComponents,
    ...allComponent.layoutComponents,
    ...allComponent.selectComponents
  ]
  let componentObj = {};
  componentArr.map(list => {
    componentObj[list.type] = list
  });
  return componentObj
}

export {
  getuuid,
  deepClone,
  combineComponent
}