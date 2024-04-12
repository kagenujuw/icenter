<template>
  <div class="cp-item" :id="material.id" @click.stop="openPanel(material)">
    <el-input v-model="material.props.text" :placeholder="material.attrs.placeholder"></el-input>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { ElInput } from 'element-plus'
const emit = defineEmits(['openPanel'])

const props = defineProps({
  material: {
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

<style scoped lang="less">
.cp-item {
  &:hover {
    background-color: #eee;
  }
}
</style>
