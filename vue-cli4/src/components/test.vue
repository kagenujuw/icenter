<template>
 <span>test {{ text }}----{{name}}---{{state}}</span>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  setup (props, context) {
    const name = ref('kage')
    const state = reactive({
      list: ['1', '2', '3']
    })
    return {
      name,
      state
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
