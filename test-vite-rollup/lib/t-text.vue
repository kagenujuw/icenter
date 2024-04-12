<!--单行文本-->
<template>
  <div>
    <el-input v-model="test"></el-input>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { ElInput } from 'element-plus'
const test = ref('');
</script>