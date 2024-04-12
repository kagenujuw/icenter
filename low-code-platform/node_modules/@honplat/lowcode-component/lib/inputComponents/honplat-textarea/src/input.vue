<template>
  <div :id="material.id" @click.stop="openPanel(material)">
    <el-input
      v-model="material.props.text"
      :autosize="{ minRows: 2, maxRows: 4 }"
      type="textarea"
      :placeholder="material.attrs.placeholder"
    />
  </div>
</template>

<script setup>
// import { ElRow, ElButton } from "element-plus";
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
