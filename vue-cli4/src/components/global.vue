<template>
  <div>
    <p>挂在全局实例化参数</p>
    <p>{{ sysName }}</p>
  </div>
</template>
<script>
import { defineComponent, getCurrentInstance, onMounted,onRenderTracked, onRenderTriggered } from 'vue'
export default defineComponent({
  name: '',
  setup () {
    const { proxy } = getCurrentInstance()
    const sysName = proxy.$systemName;
    onMounted(()=>{
      console.log('挂载后');
      proxy.$EventBus.on('newTask', data => {
        console.log(data);
      })
    })
    onBeforeUnmount(()=>{
      // 移除指定事件
      proxy.$EventBus.off('newTask');
      // 移除全部事件
      proxy.$EventBus.all.clear(); 
    })
    onRenderTracked((e)=>{
      console.log(e)
    })
    onRenderTriggered((e)=>{
      console.log(e);
    })
    return {
      sysName
    }
  }
})
</script>
