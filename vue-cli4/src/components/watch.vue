<template>
  <div>
    <p>采用watch监听事件</p>
    <p>{{state.name}}</p>
  </div>
</template>
<script>
import { watch, reactive } from 'vue'
export default {
  setup (props, ctx) {
    const state = reactive({
      name: 'a'
    })
    watch(() => state.name, (val, oldVal) => {
      console.log(`触发了watch监听：${val}`)
    })

    setTimeout(() => {
      state.name = 'b'
    }, 1500)
    return {
      state
    }
  }
}
</script>
<style>

</style>
