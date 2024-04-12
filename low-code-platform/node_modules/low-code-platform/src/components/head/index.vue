<template>
  <div>
    我也页面头部操作栏
    <el-button @click="preview">预览</el-button>
    <el-button @click="save">保存JSON数据</el-button>
  </div>
</template>
<script setup>
import { ref, computed, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const emit = defineEmits(['save', 'preview'])
const proxy = getCurrentInstance();
const preview = () => {
  emit('preview')
  router.push({name: 'preview'})
}

const save = () => {
  emit('save')
}
</script>
<style scoped lang="less">
.row{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
</style>