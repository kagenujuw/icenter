
<template>
  <watermark :text="'吴军57206'" :fontSize="15" :gap="40">
    <router-view></router-view>
  </watermark>
</template>
<script setup>
import watermark from '@/components/Watermark.vue'
</script>
<style scoped lang="less">
</style>
