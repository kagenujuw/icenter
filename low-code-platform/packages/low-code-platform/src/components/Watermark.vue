<template>
  <div class="watermark-container" ref="parentRef">
    <slot></slot>
    <!-- 我们要做的就是在这里添加一个 div，填充满整个区域，设置水印背景并且重复 -->
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted  } from 'vue';
import useWatermarkBg from './useWatermarkBg';
import { entries } from 'lodash';

const props = defineProps({
  text: {
    type: String,
    required: true,
    default: 'watermark',
  },
  fontSize: {
    type: Number,
    default: 40,
  },
  gap: {
    type: Number,
    default: 20,
  },
});
const bg = useWatermarkBg(props);
const parentRef = ref(null);
const flag = ref(0); // 声明一个依赖
// 将 div 保存在外部因为要判断节点时使用
let div;
const resetWatermark = () => {
  if (!parentRef.value) {
    return;
  }
  // 判断之前的节点是否有内容，如果有的话删除
  if (div) {
    div.remove();
  }
  const { base64, styleSize } = bg.value;
  div = document.createElement('div');
  div.style.backgroundImage = `url(${base64})`;
  div.style.backgroundSize = `${styleSize}px ${styleSize}px`;
  div.style.backgroundRepeat = 'repeat';
  div.style.inset = 0;
  div.style.zIndex = 9999;
  div.style.position = 'absolute';
  div.style.pointerEvents = 'none';
  parentRef.value.appendChild(div);
};

let ob;
onMounted(() => {
  resetWatermark();
  ob = new MutationObserver(entries => {
    // 循环节点的动作
    for (const entry of entries) {
      // 如果有节点被删除，循环一下判断是否有水印的节点
      for (const dom of entry.removedNodes) {
        if (dom === div) {
          resetWatermark(); // 删除节点的时候更新依赖
          return;
        }
      }
      // 如果有节点被修改，判断一下是否是水印的节点
      if (entry.target === div) {
        resetWatermark(); // 修改属性的时候更新依赖
        return;
      }
    }
  });
  ob.observe(parentRef.value, {
    childList: true, // 监控子节点
    attributes: true, // 监控属性
    subtree: true, //监控子树，子节点的子节点
  });
});

// 在组件卸载的时候取消监听
onUnmounted(() => {
  ob && ob.disconnect(); // 取消监听
  div = null; // 因为 div 是全局变量在写在的时候值为空
});
</script>
<style scoped>
.watermark-container {
  position: relative;
  height: 100%;
}
</style>