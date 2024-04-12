<template>
  <div :id="material.id" @click.stop="openPanel(material)">
    <el-row class="mb-4">
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="User" name="first">
        <draggable :list=material.children animation={340} group="componentsGroup" class="drag-wrapper">
            <template #item="{ element, index }">
              <div class="hon-item">
                <component :is="element[element.id]" :material="element" @openPanel="openPanel(element)"/>
              </div>
            </template>
        </draggable>

      </el-tab-pane>
      <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>
    </el-row>
  </div>
</template>

<script setup>
import { ElRow, ElButton } from 'element-plus'
import draggable from 'vuedraggable';
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

const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}

const openPanel = (meta) => {
  emit('openPanel', meta)
}

</script>

<style scoped lang="less">
.drag-wrapper {
  min-height: 60px;
  border:#b7b7b7 dashed 1px;
}
</style>
