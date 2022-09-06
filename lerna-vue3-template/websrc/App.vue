<template>
  <HookButton @click="test"></HookButton>
  <test></test>
</template>

<script>
import HookButton from '@kage/wj-button';
import alert from "@kage/wj-alert";
import test from "./components/test.vue"
export default {
  components: {
    HookButton,
    test
  },
  methods: {
    test() {
      console.log(`按钮的点击事件`);
      alert();
    }
  }
};
</script>
