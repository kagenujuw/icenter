<template>
  <div class="meta-render">
    <component :is="cp" :material="material"></component>
  </div>
</template>
<script setup>
import { ref, defineProps, shallowRef, defineAsyncComponent } from 'vue'
const emit = defineEmits(['editProps', 'openPanel']);
const cp = ref({})

const material = ref({})
const url = 'http://localhost:8888/static/honplat/1.0.0/index.umd.js';


System.import(url).then(res => {
  console.log(res)
  console.log(res.default)
  cp.value = res.default.test

  // material.value = {test:333}
  // console.log(res.inputComponents)
  // cp.value = res.inputComponents[0].honComponent
  // console.log(cp.value)
})
</script>
<style>
@import url('./style.css');
</style>