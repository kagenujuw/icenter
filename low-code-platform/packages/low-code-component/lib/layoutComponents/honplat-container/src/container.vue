<template>
  <div class="container" :id="props.material.id" @click.stop="openPanel(material)">
    <p>{{ material.props.text }}</p>
    <draggable :list=material.children animation={340} group="componentsGroup" class="drag-wrapper">
        <template #item="{ element, index }">
          <div class="hon-item">
            <component :is="element[element.id]" :material="element" @openPanel="openPanel(element)"/>
          </div>
        </template>
    </draggable>
  </div>
</template>

<script setup>
// import { ElRow, ElButton } from "element-plus";
import draggable from 'vuedraggable';
import { ref, defineProps } from 'vue'
import defaultSchema from '../schema';
const emit = defineEmits(['editProps', 'openPanel'])

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
.container {
  width: 100%;
  min-height: 100px;
  border: #0acbff solid 1px;
  padding: 0px;
}
</style>
