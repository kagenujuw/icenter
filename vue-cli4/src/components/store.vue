<template>
  <div>
    <h4>{{$store.getters.count}}</h4>
    <button @click="plusCount">点击我</button>
  </div>
</template>
<script>
import { useStore } from 'vuex';
import { getCurrentInstance } from 'vue';
export default {
  setup(props, ctx) {
    // 使用useStore方法
    const { proxy } = getCurrentInstance()
    const store = useStore();
    console.log(ctx);
    console.log(proxy)
    function plusCount(){
      store.commit('increaseCount');
      proxy.$EventBus.emit('newTask', {a:1, b:2});
    }
    return {
      plusCount
    }
  }
}
</script>
