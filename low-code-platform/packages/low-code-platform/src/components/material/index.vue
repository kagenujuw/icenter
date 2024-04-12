<template>
  <div>
    <el-button v-for="(cp, index) in honCp" @click="addMaterial(cp)">{{ cp.schema().text }}</el-button>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios'
import { getuuid} from '@/utils'
import * as honCode from '@honplat/lowcode-component';
const honCp = ref(honCode);
const emit = defineEmits(['addMaterial'])

const addMaterial = (cp) => {
  const uuid = getuuid();
  const material = {
    [uuid]: cp.honComponent,
    ...cp.schema(),
  }
  material.id = uuid
  emit('addMaterial', material)
}
// axios.get("/api/menu").then((res) => {
//   console.log(res.data.data);
// });

// axios.get("/api/blog").then((res) => {
//   console.log(res.data);
// });
</script>