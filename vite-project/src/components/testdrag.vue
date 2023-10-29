<template>
  <div class="container">
      <!-- 自定义布局的部分 -->
      <div class="grid-box" >
          <grid-layout ref="gridLayout" v-model:layout="layout" :col-num="12" :row-height="30" :is-draggable="true" :is-resizable="true" :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="true">
              <grid-item ref="gridItem" @resized="resizedEvent" v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
                  <span class="close" @click="delItem(item)"><i class="sky-iconfont icon-guanbi"></i></span>
                  <component :is="item.loadComp" />
              </grid-item>
          </grid-layout>
      </div>
      <!-- 可拖入的组件部分 -->
      <div class="components-box">
          <div class="ctrl-box" v-for="item in componentsInfo" :key="item.id" @drag="drag" @dragstart="dragstart($event, item)" @dragend="dragend" draggable="true">
              {{item.des}}
          </div>
      </div>
  </div>
</template>

<script setup >
import { onMounted, ref, getCurrentInstance, defineAsyncComponent } from 'vue'
const { proxy } = getCurrentInstance()
const layout = ref([])
const colNum = 12
let defaultH = 2
let defaultW = 2
let mouseXY = {
  x: null,
  y: null
}
let DragPos = {
  x: null,
  y: null,
  w: null,
  h: null,
  i: null
}
const componentsInfo = [
  {
      id: '1-1',
      title: '图表-年度统计仪表盘',
      name: 'annualOutput',
      component: '/testCp/output1',
      des: '图表-年度统计仪表盘',
      w: 2,
      h: 3
  },
  {
      id: '1-2',
      title: '图表-月度统计折线图',
      name: 'MonthOutput',
      component: '/testCp/output2',
      des: '图表-月度统计折线图',
      w:3,
      h: 3
  },
  {
      id: '1-3',
      title: '图表-日统计柱状图',
      name: 'dayOutput',
      component: '/testCp/output3',
      des: '图表-日统计柱状图',
      w: 5,
      h: 3
  }
]
let currentDragCom = null
onMounted(() => {
  document.addEventListener('dragover', (e) => {
      e.preventDefault()
      mouseXY.x = e.clientX;
      mouseXY.y = e.clientY;
  }, false);
  document.addEventListener('dragenter', function (event) {
      // 阻止默认行为
      event.preventDefault()
  });
  processLayout(layout.value)
})
// 处理布局数据中的组件
const processLayout = (layoutSetInfo) => {
  for (let i = 0; i < layoutSetInfo.length; i++) {
      let item = layoutSetInfo[i]
      if (!item.component) {
          continue
      }
      let resComp = loadComponent(item.component.component)
      item.loadComp = resComp
  }
}
// 引入组件
const loadComponent = (path) => {
  return defineAsyncComponent(() =>
      import(`@/${path}`)
  )
}
const dragstart = (e, item) => {
  e.dataTransfer.effectAllowed = 'move'
  currentDragCom = item
  defaultH = item.h
  defaultW = item.w
}
const drag = (e, item) => {
  e.preventDefault && e.preventDefault()
  let parentRect = document.querySelector('.grid-box').getBoundingClientRect();
  let mouseInGrid = false;
  if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
      mouseInGrid = true;
  }
  if (mouseInGrid === true && (layout.value.findIndex(item => item.i === 'drop')) === -1) {
      layout.value.push({
          x: (layout.value.length * 2) % (colNum || 12),
          y: layout.value.length + (colNum || 12),
          w: defaultW,
          h: defaultH,
          i: 'drop',
      });
  }
  let index = layout.value.findIndex(item => item.i === 'drop');
  if (index !== -1) {
      try {
          proxy.$refs.gridItem[layout.value.length - 1].$refs.item.style.display = "none";
      } catch {
      }
      let el = proxy.$refs.gridItem[index];
      if (el) {
          el.dragging = { "top": mouseXY.y - parentRect.top, "left": mouseXY.x - parentRect.left };
          let new_pos = el && el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);
          if (mouseInGrid === true) {
              //  function dragEvent(eventName, id, x, y, h, w)
              proxy.$refs.gridLayout.dragEvent('dragstart', 'drop', new_pos.x || 0, new_pos.y || 0, defaultH, defaultW);
              DragPos.i = String(new Date().getTime());
              DragPos.x = layout.value[index].x;
              DragPos.y = layout.value[index].y;
          }
          if (mouseInGrid === false) {
              proxy.$refs.gridLayout.dragEvent('dragend', 'drop', new_pos.x || 0, new_pos.y || 0, defaultH, defaultW);
              layout.value = layout.value.filter(obj => obj.i !== 'drop');
          }
      }
  }
}
const dragend = (e) => {
  let parentRect = document.querySelector('.grid-box').getBoundingClientRect();
  let mouseInGrid = false;
  if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
      mouseInGrid = true;
  }
  if (mouseInGrid === true) {
      proxy.$refs.gridLayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, defaultH, defaultW);
      let delIndex = layout.value.findIndex(item => item.i === 'drop')
      layout.value.splice(delIndex, 1)
      // let loadComp = loadComponent(currentDragCom.component)
      let loadComp = defineAsyncComponent(() => import('./testCp/output1.vue'))

      layout.value.push({
          x: DragPos.x,
          y: DragPos.y,
          w: currentDragCom.w,
          h: currentDragCom.h,
          i: DragPos.i,
          component: currentDragCom,
          loadComp: loadComp
      });
      proxy.$refs.gridLayout.dragEvent('dragend', DragPos.i, DragPos.x, DragPos.y, currentDragCom.h, currentDragCom.w);
      try {
          proxy.$refs.gridItem[layout.value.length].$refs.item.style.display = "block";
      } catch {
      }
  }
}
// 尺寸变更后，触发resize事件，使图表resize
const resizedEvent = e => {
  if (document.createEvent) {
      let ev = new Event('resize')
      window.dispatchEvent(ev)
  } else if (document.createEventObject) {
      window.fireEvent('onresize')
  }
}
// 删除item
const delItem = (item) => {
  let delIndex = layout.value.findIndex(el => el.i === item.i)
  layout.value.splice(delIndex, 1)
  compact(layout.value)
}
const compact = (layoutdata) => {
    const compareWith = []
    const sorted = sortLayoutItemsByRowCol(layoutdata);
    const out = Array(sorted.length)
    for (let i = 0, len = sorted.length; i < len; i++) {
        let l = sorted[i]
        l = compactItem(compareWith, l)
        // 加入对比数组，检测冲突时比较其中的元素
        compareWith.push(l);
 
        // 放入输出的数组，维持原来的顺序
        out[layoutdata.indexOf(l)] = l;
 
        // Clear moved flag, if it exists.
        // l.moved = false;
    }
    return out
}
// 根据行列对元素重新排列
const sortLayoutItemsByRowCol = (layoutdata) => {
    return [].concat(layoutdata).sort(function (a, b) {
        if (a.y === b.y && a.x === b.x) {
            return 0;
        }
        if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
            return 1;
        }
        return -1;
    });
}
// 判断每一个元素的冲突情况，无冲突则y=0，有冲突则y=冲突项的y+冲突项的h
const compactItem = (compareWith, item) => {
    while (item.y > 0 && !getFirstCollision(compareWith, item)) {
        item.y--;
    }
    let collides;
    while ((collides = getFirstCollision(compareWith, item))) {
        item.y = collides.y + collides.h;
    }
    return item
}
// 找到第一个冲突的元素
const getFirstCollision = (compareWith, item) => {
    for (let i = 0, len = compareWith.length; i < len; i++) {
        if (collides(compareWith[i], item)) return compareWith[i];
    }
}
// 判断两个元素是否有冲突重叠
const collides = (item1, item2) => {
    if (item1 === item2) return false; // 同一个item
    if (item1.x + item1.w <= item2.x) return false; // item1 在 item2左边
    if (item1.x >= item2.x + item2.w) return false; // item1 在 item2右边
    if (item1.y + item1.h <= item2.y) return false; // item1 在 item2上边
    if (item1.y >= item2.y + item2.h) return false; // item1 在 item2下边
    return true; // 其他情况则是有冲突重叠
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  min-height: 500px;
  width: 100%;
}
.grid-box {
  width: calc(100% - 300px);
  min-height: 500px;
}
.components-box {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 260px;
  border: 1px solid rgba(66, 66, 66, 1);
  padding: 12px 20px;
  .ctrl-box {
      height: 40px;
      padding: 0 12px;
      color: #000;
      display: flex;
      align-items: center;
      background: #dadada;
      border: 1px solid rgba(66, 66, 66, 1);
      margin-top: 20px;
      user-select: none;
      -webkit-user-select: none;
  }
}
</style>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 500px;
}
.vue-grid-layout {
  min-height: 500px;
  background: transparent;
  border: 1px solid rgba(66, 66, 66, 1);
  overflow: auto;
  .vue-grid-item {
      background: #d2d2d2;
      border: 1px solid rgba(66, 66, 66, 1);
      border-radius: 2px;
      padding: 12px 20px;
  }
  .close {
      display: inline-block;
      height: 16px;
      width: 16px;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.6);
      background-color: #000;
      border-radius: 50%;
      i {
          font-size: 20px;
      }
      &:hover {
          color: #fff;
      }
  }
  .vue-grid-item.vue-resizable.vue-grid-placeholder {
      background: white !important;
  }
}
</style>