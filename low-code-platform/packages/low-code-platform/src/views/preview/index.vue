<template>
  <el-button @click="back">返回</el-button>
  <p>运行时渲染页面的数据</p>
  <div v-if="honComponent.length>0">
    <honplatLowcodeRender :metaData="honComponent"/>
  </div>
  
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import honplatLowcodeRender from '@honplat/lowcode-render';
import honplatLowcodeRender from './dist1/lowcode-render.es.js'
import axios from 'axios'
// import * as honCode from '@honplat/lowcode-component';
// import * as honCode from './dist/index.es.js';
import * as honCode from 'lowcode-test-comp';
import { combineComponent } from '@/utils'

const honCp1 = ref(combineComponent(honCode));
const router = useRouter();
const honComponent = ref([]);

const back = () => {
  router.push({path: '/'})
}

const initGetMetaData = () => {
  // 模拟接口调用后端数据
  axios.get("/api/blog").then((res) => {
    const {code } = res.data;
    if (code === '0000') {
      let schemaStr = localStorage.getItem('schema');
      if (schemaStr) {
        let schemaData = JSON.parse(schemaStr);
        System.import('http://localhost:8888/static/honplat/1.0.0/index.umd.js').then(res => {
          // const honCp = res.default;
          const honCp = honCp1.value;
          honComponent.value = schemaData.map(cp => {
            cp[cp.id] =  honCp[cp.componentAlias].honComponent
            return cp
          })
        })
      }
    }
  });
}

const combineData = (arr, honCp) => {
  if (arr && Array.isArray(arr)) {
    arr.map(cp => {
      cp[cp.id] =  honCp[cp.componentAlias].honComponent;
      if (cp.children && cp.children.length > 0) {
        combineData(cp.children, honCp);
      }
    })
  }
}

const initMockData = () => {
  let schemaStr = localStorage.getItem('schema');
  if (schemaStr) {
    let schemaData = JSON.parse(schemaStr);
    System.import('http://localhost:8888/static/honplat/1.0.0/index.umd.js').then(res => {
      // const honCp = res.default;
      const honCp = honCp1.value;
      combineData(schemaData, honCp)
      honComponent.value = schemaData;
      console.log(honComponent.value)
    })
  }
}

const initPage = () => {
  // initGetMetaData();
  initMockData();
}

initPage();



</script>