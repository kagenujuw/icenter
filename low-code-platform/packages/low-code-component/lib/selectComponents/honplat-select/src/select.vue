<template>
  <div :id="props.material.id"  @click.stop="openPanel(material)">
   我是下拉选择组件
  </div>
</template>

<script setup>
// import { ElProgress } from "element-plus";
import { ref, defineProps } from 'vue'
import defaultSchema from '../schema';

const props = defineProps({
  material: {
    type: Object,
    default() {
      return {}
    }
  },
})

const emit = defineEmits(['openPanel'])
const openPanel = (meta) => {
  emit('openPanel', meta)
}

</script>

<style scoped>
</style>
