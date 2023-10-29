<template>
  <div class="grid-box" >
    <grid-layout ref="gridLayout" v-model:layout="layout" :col-num="12" :row-height="30" :is-draggable="true" :is-resizable="true" :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="true">
        <grid-item ref="gridItem" @resized="resizedEvent" v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
            <span class=" close" @click="delItem(item)"><i class="iconfont icon-guanbi"></i></span>
            {{item.i}}
        </grid-item>
    </grid-layout>
  </div>
</template>
<script setup >
    import { onMounted, ref, getCurrentInstance, defineAsyncComponent } from 'vue'
    const { proxy } = getCurrentInstance()
    const layout = ref([
        { "x": 0, "y": 0, "w": 2, "h": 2, "i": "0" },
        { "x": 2, "y": 0, "w": 2, "h": 4, "i": "1" },
        { "x": 4, "y": 0, "w": 2, "h": 5, "i": "2" },
        { "x": 6, "y": 0, "w": 2, "h": 3, "i": "3" },
        { "x": 8, "y": 0, "w": 2, "h": 3, "i": "4" },
        { "x": 10, "y": 0, "w": 2, "h": 3, "i": "5" },
        { "x": 0, "y": 5, "w": 2, "h": 5, "i": "6" },
        { "x": 2, "y": 5, "w": 2, "h": 5, "i": "7" },
        { "x": 4, "y": 5, "w": 2, "h": 5, "i": "8" },
        { "x": 6, "y": 3, "w": 2, "h": 4, "i": "9" },
        { "x": 8, "y": 4, "w": 2, "h": 4, "i": "10" }
    ])
</script>
<style scoped>
.grid-box {
  width: 100%;
  min-height: 500px;
  background-color: #ccc;
}
.vue-grid-item {
  background-color: #fff;
}
.close {
        display: inline-block;
        height: 16px;
        width: 16px;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        color: #fff;
    }

</style>