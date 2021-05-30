/**
 * 渲染几万条的数据页面不卡的方法
 */
function loadMoreData() {
  setTimeout(() => {
    // 插入十万条数据
    const total = 100000;
    // 一次插入的数据
    const once = 10;
    // 插入数据需要的次数;
    const loopCount = Math.ceil(total/once);
    let countOfRender = 0;
    const ul = document.querySelector('ul');
    // 添加数据的方法；
    function add(){
      const fragment = document.createDocumentFragment();
      for(let i=0; i<once; i++) {
        const li = document.createElement('li');
        li.innerText = Math.floor(Math.random()*total);
        fragment.appendChild(li);
      }
      ul.appendChild(fragment);
      countOfRender += 1;
      loop();
    }
    function loop() {
      if(countOfRender < loopCount) {
        window.requestAnimationFrame(add);
      }
    }
    loop();
  }, 0)
}

/**
 * 类型判断
 */
function type(obj) {
  let toString = Object.prototype.toString;
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

/** 
 * 利用reduce方法来实现
*/
function uniqueArray(arr, key) {
  let hash = {};
  return arr.reduce(function(item, next){
    hash[next[key]]?'':hash[next[key]] = true && item.push(next);
    return item;
  },[])
}

/**
 * 对包含对象的二维数组进行去重
 */
function uniqueArr(arr, key) {
  let newArr = [];
  for(let i=0;i<arr.length; i++){
    let flag=true;
    for(let j=0;j<newArr.length;j++){
      if(arr[i][key] == newArr[j][key]) {
        flag = false;
      }
    }
    if(flag) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

/** 
 * 获取当前日期
*/
function getCurrentDate() {
  const add_zero = (temp) => {
    if(temp < 10) return '0'+temp;
    else return temp;
  }
  let d = new Date();
  let y = d.getYear() + 1900,
      month = add_zero(d.getMonth() +1),
      days = add_zero(d.getDate()),
      hours = add_zero(d.getHours()),
      minutes = add_zero(d.getMinutes()),
      seconds = add_zero(d.getSeconds());
  let str = y+'-'+month+'-'+days+' '+ hours+":"+minutes+":"+seconds;
  return str;
}

/**
 * 获取字符串长度
 */
function strLen(str) {
  let length = 0;
  let charCode = -1;
  for(let i = 0; i < str.length; i++) {
    charCode = str.charCodeAt(i);
    if(charCode >=0 && charCode <= 128) {
      length += 1;
    } else {
      length += 2;
    }
  }
  return length;
}

/**
 * 获取地址传递的参数
 * 还存在一种方法 var urlParams = new URLSearchParams('?post=123&action=edit');
 * console.log(urlparams.get('action'));
 */
function getQueryString(name) {
  let reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
  let r = window.location.search.substr(2).match(reg);
  if(r!=null) return
  unescape(r[2]);return null;
}

/**
 * 清除脚本样式
 */
function clearScript(str) {
 return str.replace(/<script.*?>.*?<\/script>/gi, '');
}

/**
 * file图片文件返回Base64数据
 */
function fileToBase64(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(e) {
    return e.target.result;
  }
}

/**
 * 动态加载css样式
 */
function loadStyle(url) {
  try {
    document.createStyleSheet(url);
  } catch (e) {
    let cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.type = 'text/css';
    cssLink.href = url;
    let head = document.getElementsByName('head')[0];
    head.appendChild(cssLink);
  }
}

/**
 * 如何平滑滚动到页面顶部
 */
function scrollTop() {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if(c > 0) {
    window.requestAnimationFrame(scrollTop);
    window.scrollTo(0, c - c/8);
  }
}

/** 
 * 随机生成时间戳
*/
function randomIm(len=10) {
  return Math.random().toString(36).substr(3, len);
}

/**
 * 字段补充对于字符串
 */
function fillString(str, len, fillStr) {
  return str.toString().padStart(fillStr, len);
}

/**
 * 判断是否为空数组
 */
function isEmptyArray(arr) {
  return Array.isArray(arr) && !arr.length;
}

/**
 * 判断是否为空对象
 */
function isEmptyObject(obj){
  return typeof obj == 'object' && !Object.keys(obj).length;
}

/**
 * 过滤XSS
 */
function filterXss(content) {
  let elem = document.createElement('div');
  elem.innerText = content;
  const result = elem.innerHTML;
  elem = null;
  return result;
}