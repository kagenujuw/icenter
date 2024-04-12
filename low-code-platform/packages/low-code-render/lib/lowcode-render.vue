<template>
  <div :class="['meta-render']">
    <div class="hon-item" v-for="(honCp, index) in metaData" :key="index">
      <component :is="honCp[honCp.id]" :material="honCp" @openPanel="openPanel(honCp)"/>
      <lowcode-render v-if="honCp.componentType !== 'container' && honCp.componentType !== 'tabs' && honCp?.children.length > 0" :metaData="honCp.children" v-bind="$attrs" v-on="$listeners" @openPanel="openPanel"/>
    </div>
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