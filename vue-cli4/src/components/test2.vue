<template>
 <div>
   <button @click="send">我是子组件</button>
 </div>
</template>

<script>
import mitt from 'mitt'
const emitter = mitt()

export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  setup (props, context) {
    function send () {
    // f发送
      emitter.emit('foo', { a: 'b' })
    }

    // 监听接收
    emitter.on('foo', e => console.log('foo', e))
    return {
      send
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
