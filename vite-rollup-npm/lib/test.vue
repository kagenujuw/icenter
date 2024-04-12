<!--单行文本-->
<template>
  <div>
    <el-input v-model="input" placeholder="Please input" />
    <!-- <el-input v-model="input" placeholder="Pick a date" :suffix-icon="Calendar"/> -->
    <el-button type="primary">Primary</el-button>
  </div>
</template>
<script setup>
import { ref, defineProps } from 'vue'
import {ElInput, ElButton} from 'element-plus';
// import { Calendar, Search } from '@element-plus/icons-vue'cls
// import 'element-plus/es/components/button/style/css'
const input = ref('')

const props = defineProps({
  material: {
    type: Object,
    default() {
      return {}
    }
  },
})

</script>