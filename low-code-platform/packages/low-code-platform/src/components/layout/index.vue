
<template>
  <div class="common-layout">
    <el-container>
      <router-view/>
    </el-container>
  </div>
</template>
<script setup>
</script>
<style scoped lang="less">
.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header {
    background-color: #c6e2ff;
  }
  .el-aside {
    background-color: #d9ecff;
  }
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
