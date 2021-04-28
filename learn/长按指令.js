const longPress = Vue.directive('longpress', {
  bind: function(el, binding, vNode) {
    if(typeof binding.value !== 'function') {
      throw 'callback must be a function';
    }
    let pressTimer = null;
    // 定制定时器
    const start = (e) => {
      if(e.type == 'click' && e.button !== 0) {
        return;
      }
      if(pressTimer == null) {
        pressTimer = setTimeout((e) => {
          binding.value(e);
        }, 1000);
      }
    }
    // 取消计时器
    const cancel = (e) => {
      if(pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    }

    // 添加事件监听器
    el.addEventListener('mousedown', start);
    el.addEventListener('touchstart', start);
    // 取消计时器
    el.addEventListener('click', cancel);
    el.addEventListener('mouseout', cancel);
    el.addEventListener('touchend', cancel);
    el.addEventListener('touchcancel', cancel);
  },
  componentUpdated(el, {value}) {
    // 当传进来的值更新时触发
    el.$value = value;
  },
  unbind(el) {
    // 指令与元素解绑的时候，移除事件绑定
    el.removeEventListener('click', el.handler);
  }
})