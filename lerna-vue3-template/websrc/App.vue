<template>
  <HookButton @click="test"></HookButton>
</template>

<script>
import HookButton from '@kage/wj-button';
import alert from "@kage/wj-alert";
export default {
  components: {
    HookButton
  },
  methods: {
    test() {
      console.log(`按钮的点击事件`);
      alert();
    }
  }
};
</script>
