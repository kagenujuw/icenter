<template>
  <div :id="props.material.id"  @click.stop="openPanel(material)">
    <div class="demo-progress">
      <el-progress :text-inside="true" :stroke-width="15" :percentage="material.props.percentage" />
      <el-progress :type="material.props.type" :percentage="material.props.percentage" />
      <el-progress :type="material.props.type" :percentage="material.props.percentage" status="success" />
      <el-progress :type="material.props.type" :percentage="material.props.percentage" status="warning" />
      <el-progress :type="material.props.type" :percentage="50" status="exception" />
    </div>
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
