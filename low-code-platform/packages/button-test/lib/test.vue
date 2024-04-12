<template>
  <div>
   <el-button type="primary">测试按钮</el-button>
  </div>
</template>
<script setup>
import { ref, defineProps } from 'vue'
const emit = defineEmits(['editProps', 'openPanel']);

const props = defineProps({
  metaData: {
    type: Object,
    default() {
      return {}
    }
  },
})

const openPanel = (meta) => {
  emit('openPanel', meta)
}

</script>
<style lang="less" scoped>
.meta-render {
  border: 1px dashed #ccc;
  padding: 10px;
  cursor: move;
  &:hover {
    background: #f7f7f7;
    border-radius:5px;
  }
}
</style>