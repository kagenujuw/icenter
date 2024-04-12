<template>
  <div class="meta-render">
    <render></render>
  </div>
</template>
<script setup>
import { h, ref, shallowRef  } from "vue"
const cp = ref({})
const render = ref({})
 const conter = ref(0)
  
  const increment = () => {
    conter.value ++
  }

  const decrement = () => {
    conter.value --
  }
  const url = 'http://localhost:8888/static/honplat/1.0.0/index.umd.js';
  System.import(url).then(res => {
    console.log(res)
    console.log(res.default)
    cp.value = res.default.test

    render.value = () => h(cp.value, { class: "app" })

  })
  // 将这个render函数保存到一个变量中
  // const render = () => h("div", { class: "app" }, [
  //   h("h2", { class: "title" }, `当前计数: ${conter.value}`),
  //   h("button", { onclick: increment }, "+"),
  //   h("button", { onclick: decrement }, "-")
  // ])
</script>
<style>
</style>