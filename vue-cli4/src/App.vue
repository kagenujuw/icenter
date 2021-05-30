<template>
  <div>
    <storeCpt/>
    <test text="test的值"/>
    <test1 text="test1的值"/>
    <global/>
    <test2/>
    <watchCpt/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import test from './components/test.vue'
import test1 from './components/test1.vue'
import test2 from './components/test2.vue'
import watchCpt from './components/watch.vue'
import global from './components/global.vue'
import storeCpt from './components/store.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    test,
    test1,
    test2,
    watchCpt,
    global,
    storeCpt
  },
  setup (props, ctx) {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
