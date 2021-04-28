/**
 * 防抖
 * @param {*} fn     需要防抖的函数
 * @param {*} delay  毫秒 防抖期限值
 * 
 */
export const debounce = (fn, delay) {
  let timer = null;
  return function () {
    if(timer) clearTimeout(timer);
    timer = setTimeout(fn, delay);
  }
}

/**
 * 节流
 * @param {*} fn 需要节流的函数
 * @param {*} delay 毫秒 节流期限值
 * 
 */
export const throttle = (fn, delay) => {
  let last, deferTimer
    return function (args) {
        let that = this
        let _args = arguments
        let now = +new Date()
        if (last && now < last + delay) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(function () {
                last = now
                fun.apply(that, _args)
            }, delay)
        }else {
            last = now
            fun.apply(that,_args)
        }
    }
}

/**
 * 格式化时间戳
 * @param {'01', '02', '03'}
 * 返回时间类型：'01': xxxx-xx-xx xx:xx:xx
 *              '02': xx:xx:xx
 *              '03': xxxx-xx-xx
 * @param {*} time 传入时间戳，如果不传，以当前时间为准
 * 
 */
export const format = (type, time) => {
  let timeStr;
  if(time) {
    timeStr = time;
  } else {
    timeStr = new Date();
  }
  let date = new Date(timeStr);
  let y = date.getFullYear();
  let m = (date.getMonth() + 1 + '').padStart(2, '0');
  let d = (date.getDate() + '').padStart(2, '0');
  let hh = (date.getHours() + '').padStart(2, '0');
  let mm = (date.getMinutes() + '').padStart(2, '0');
  let ss = (date.getSeconds() + '').padStart(2, '0');

  if(type === '01') {
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  } else if(type === '02') {
    return `${y}-${m}-${d}`
  } else if(type === '03') {
    return `${hh}:${mm}:${ss}s`
  } else {
    return '参数错误'
  }
}

/**
 * 是否支持触摸事件
 */
export const isSupportTouch = () => {
  let isSupportTouch = ("ontouchstart" in document.documentElement) ? true : false;
  return isSupportTouch
}

/**
 * 敏感符号转义
 * @param {s} 字符串
 */

 export const xssCovert = (s) => {
  let e = {
    '"': '&quot;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  }
  return s.replace(/["<>&]/g, m => {
      return e[m]
  })
 }

 /**
  * 数组去重
  */
 export const distinct = (arr = testArr) => {
  return arr.filter((v, i, array) => array.indexOf(v) === i)
 }

 /**
  * 计算字符串长度
  * @param {str} 传递字符串
  */
 export const countBytesLength = (str) => {
  let length = 0
  //首先遍历传入的字符串
  for(let i = 0; i < str.length; i++) {
      if (str[i].charCodeAt(i) > 255) {
          length += 2
      } else {
          length++
      }
  }
  return length
 }

 /**
  * 冒泡排序
  * @param {*}
  *  
  */
 export const bubbleSort = () => {
  var temp = null;
  for (var i = 0; i < this.length - 1; i++) {
      for (var k = 0; k < this.length - 1 - i; k++) {
          if (this[k] > this[k + 1]) {
              temp = this[k];
              this[k] = this[k + 1];
              this[k + 1] = temp;
          }
      }
  }
  return this;
 }

 /** 
  * 去掉字符串空格
  * @param {str}  字符串
  * @param {type} 1-所有空格  2-前后空格  3-前空格 4-后空格
  * 
 */
export const trim = (trim, type) => {
  switch (type) {
    case 1:
      return str.replace(/\s+/g, "");
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, "");
    case 3:
      return str.replace(/(^\s*)/g, "");
    case 4:
      return str.replace(/(\s*$)/g, "");
    default:
      return str;
  }
}

/**
 * 返回数组里最大的值
 * @param {arr} 数组
 */
export const maxArr = (arr) => {
  return Math.max.apply(null, arr);
}

/**
 * 返回数组里最小的值
 * @param {arr} 数组
 */
export const minArr = (arr) => {
  return Math.min.apply(null, arr);
}

export const GetQueryString = (name) => {
  let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
  if(r!=null)return  unescape(r[2]); return null;
}