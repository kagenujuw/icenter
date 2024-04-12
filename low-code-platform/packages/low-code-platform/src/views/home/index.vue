
<template>
  <!-- <watermark :text="'吴军57206'" :fontSize="15" :gap="80"> -->
  <div class="common-layout">
    <el-container>
      <el-header><honplatHeader @save="save" @preview="preview"/></el-header>
      <el-container >
        <el-aside width="200px" class="left-aside">
          <el-scrollbar class="left-scrollbar">
            <div class="components-list">
              <div v-for="(item, listIndex) in leftComponents" :key="listIndex">
                <div class="components-title">
                  <Memo style="width: 1em; height: 1em;" />
                  {{ item.title }}
                </div>
                <draggable 
                  class="components-draggable"
                  :list="item.list"
                  :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                  :clone="cloneComponent"
                  draggable=".components-item"
                  :sort="false"
                  @end="onEnd"
                >
                  <template #item="{ element, index }">
                    <div class="components-item" @click="addMaterial(element)">
                      <div class="components-body">{{ element.schema().text }}</div>
                    </div>
                  </template>
                </draggable>
              </div>
            </div>
            <!-- <materialPanel @addMaterial="addMaterial"/> -->
          </el-scrollbar>
        </el-aside>
        <el-main>
          <el-scrollbar class="draw-scroll">
            <draggable class="drawing-board" :list="honComponent" :animation="340" group="componentsGroup">
              <template #item="{ element, index }">
                <div class="components-item">
                  <honplatLowcodeRender :metaData="[element]" @openPanel="openPanel"/>
                </div>
              </template>
            </draggable>
            <div v-show="!honComponent.length" class="empty-info">
              从左侧拖入或点选组件进行表单设计
            </div>
          </el-scrollbar>
        </el-main>
        <el-aside width="300px" class="right-aside">
          <honplatPanel :panel="panel"/>
        </el-aside>
      </el-container>
    </el-container>
  </div>
<!-- </watermark> -->
</template>
<script setup>
import { ref, toRaw } from 'vue';
import draggable from 'vuedraggable';
import { Edit, Memo } from '@element-plus/icons-vue';
import * as honCode from '@honplat/lowcode-component';
import { getuuid, deepClone} from '@/utils'
import honplatLowcodeRender from '@honplat/lowcode-render';
import materialPanel from '@/components/material/index.vue';
import honplatPanel from '@/components/panel/index.vue';
import honplatHeader from '@/components/head/index.vue'
import watermark from '@/components/Watermark.vue'
const text = ref('我是属性传值');
const tempActiveData = ref({});

const leftComponents = ref([
  {
    title: '输入型组件',
    list: honCode.inputComponents
  },
  {
    title: '选择型组件',
    list: honCode.selectComponents
  },
  {
    title: '布局型组件',
    list: honCode.layoutComponents
  }
]);
const honComponent = ref([]);
const panel = ref({});

const cloneComponent = (origin) => {
  const clone = deepClone(origin);
  tempActiveData.value = clone
};

const addMaterial = (cp, obj) => {
  const uuid = getuuid();
  const material = {
    [uuid]: cp.honComponent,
    ...cp.schema(),
  }
  material.id = uuid;
  if (obj && obj.to.className === 'drawing-board') {
    console.log(111)
    honComponent.value.push(material);
  } else if (obj && obj.to.className === 'drag-wrapper'){
    // 容器
    const cpContainer = honComponent.value.find(list => list.componentType === 'container' || list.componentType === 'tabs');
    if (cpContainer) {
      console.log(2222)
      cpContainer.children.push(material)
    } else {
      console.log(3333)
      honComponent.value.push(material);
    }
  } else {
    console.log(4444)
    honComponent.value.push(material);
  }
  console.log(honComponent.value)
}

const onEnd = (obj) => {
  if (obj.from !== obj.to) {
    addMaterial(tempActiveData.value, obj)
  }
}

const openPanel = (meta) => {
  // 打开属性面板
  let obj = null;
  const getObj = (arr) => {
    for (let i = 0; i < arr.length; i ++ ) {
      if (arr[i].id === meta.id) {
        obj = arr[i];
        break;
      }
      if (arr[i].children.length > 0) {
        getObj(arr[i].children)
      }
    }
  }
  getObj(honComponent.value);
  if (obj) {
    panel.value = obj;
  }
}

const save = () => {
  // 保存当前的数据
  const schemaData = honComponent.value.map(list => {
    const newList = toRaw(list);
    delete newList[newList.id]
    return {
      ...newList
    }
  })
  localStorage.setItem('schema',JSON.stringify(schemaData))
}
</script>
<style scoped lang="less">
@import '@/assets/css/home.less';

</style>
