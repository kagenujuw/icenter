<template>
  <div>
    我是属性面板的值
    <div class="row" v-if="keyArr.length>0" v-for="(key, index) in keyArr" :key="index">
      <div class="left">{{ key }}:</div>
      <div class="right" v-if="key==='text'">
        <el-input v-model="panel.props.text" placeholder="Please input" />
      </div>
      <div class="right" v-if="key==='type'">
        <el-select v-model="panel.props.type" class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="right" v-if="key==='percentage'">
        <el-input v-model="panel.props.percentage" placeholder="Please input" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
const options = [
  {
    value: 'circle',
    label: 'circle',
  },
  {
    value: 'line',
    label: 'line',
}]

const props = defineProps({
  panel: {
    type: Object,
    required: true,
    default(){
      return {}
    }
  }
})

const keyArr = computed(() => {
  return (props?.panel.props && Object.keys(props?.panel?.props)) || []
})
</script>
<style scoped lang="less">
.row{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
</style>