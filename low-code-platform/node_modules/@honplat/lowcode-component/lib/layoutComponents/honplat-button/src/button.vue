<template>
  <div :id="material.id" @click.stop="openPanel(material)">
    <el-row class="mb-4">
      <el-button>{{ material.props.text }}</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
  </div>
</template>

<script setup>
import { ElRow, ElButton } from 'element-plus'
import { ref, defineProps } from 'vue'
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

<style scoped>
</style>
