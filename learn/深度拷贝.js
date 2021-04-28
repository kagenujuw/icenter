function deepClone(target,cache = new Map()) {
  if(cache.get(target)) {
    return cache.get(target);
  }
  if(target instanceof Object) {
    let dist;
    if(target instanceof Array) {
      // 拷贝数组
      dist = [];
    } else if(target instanceof Function) {
      // 拷贝函数
      dist = function() {
        return target.call(this, ...arguments);
      }
    } else if(target instanceof RegExp) {
      // 拷贝正则表达式
      dist = new RegExp(target.source, target.flags);
    } else if(target instanceof Date) {
      // 拷贝日历
      dist = new Date(target);
    } else {
      dist = {}
    }
    // 将属性和拷贝后的值作为一个map
    cache.set(target, dist);
    for(let key in target) {
      // 过滤掉原型身上的属性
      dist[key] = deepClone(target[key], cache);
    }
    return dist;
  } else {
    return target;
  }
}