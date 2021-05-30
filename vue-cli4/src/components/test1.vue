<template>
 <div>
   <button @click="increment">点击我增加</button>
   <span>显示的数量为：{{state.count}}--{{num}}</span>
 </div>
</template>

<script>
import { ref, reactive } from 'vue'
/**
 * Reactive 相当于当前的 Vue.observable () API，经过reactive处理后的函数能变成响应式的数据，
 * 类似于option api里面的data属性的值
 */

export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  setup (props, context) {
    context.emit('event')
    const num = ref(0)
    const state = reactive({
      count: 0
    })
    function increment () {
      state.count++
      num.value++
    }

    const fetch = () => {
      console.log('fetchData')
    }
    return {
      num,
      state,
      increment,
      fetch
    }
  }
}
</script>

<style module>
.span1 {
 color: green;
 font-size: 30px;
}
</style>
