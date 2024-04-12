<template>
  <div class="meta-render">
    <render></render>
  </div>
</template>
<script setup>
import { h, ref } from "vue"
 
 const conter = ref(0)
  
  const increment = () => {
    conter.value ++
  }

  const decrement = () => {
    conter.value --
  }

  // 将这个render函数保存到一个变量中
  const render = () => h("div", { class: "app" }, [
    h("h2", { class: "title" }, `当前计数: ${conter.value}`),
    h("button", { onclick: increment }, "+"),
    h("button", { onclick: decrement }, "-")
  ])
</script>
<style>
</style>