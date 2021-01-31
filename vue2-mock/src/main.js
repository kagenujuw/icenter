// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import router from './router'
import common from './assets/js/common.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/css/resetElementUi.css'
import filters from './filters'
import store from './store/'

import plugin from './plugins/'
import directives from './directives/'
//引入全局过滤器
Object.keys(filters).forEach((key)=>{
	Vue.filter(key,filters[key])
})

Vue.use(ElementUI)
Vue.use(common)
Vue.use(plugin)
Vue.use(directives)

Vue.config.productionTip = false

/* eslint-disable no-new */

window.vueInstance = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
