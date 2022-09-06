<template>
  <div class="box">
    <div class="box-left">
      <div classs="box-drop"></div>
    </div>
    <div class="box-right">
      <div class="card-list">
        <div class="card-item" v-for="(item, index) in arr" :key="index">
          <h2>{{item.name}}</h2>
          <p>{{item.desc}}</p>
          <button>添加</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'test',
  data() {
    return {
      arr: []
    }
  },
  created() {
    // this.initData();
  },
  methods: {
    initData() {
      const len = 10;
      for(const i = 0; i <= len; i++) {
        const obj = {
          name: `测试卡片的功能${i}`,
          isAdd: false,
          desc: `卡片的描述功能${i}`
        }
        arr.push(obj)
      }
    }
  }
}
</script>
<style scoped>
.box {
  width: 100%;
}
.box-left {
  width: 375px;
  height: 600px;
  border: solid 2px #f60;
  border-radius: 10px;
}
.box-right {
  float: left;
  width: 300px;
}
.card-item {
  border: solid 1px #eee;
  min-height: 200px;
}
</style>