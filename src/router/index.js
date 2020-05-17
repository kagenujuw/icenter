import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass:'active',
  routes: [
  	{
      path: '/index',
      // name: 'index',
      component: resolve=>require(['@/components/layout/index.vue'],resolve),
      children:[{
      	path:'allTask',
      	name:'allTask',
      	component: resolve=>require(['@/components/routerView/allTask.vue'],resolve)
      },{
      	path:'ownTask',
      	name:'ownTask',
      	component: resolve=>require(['@/components/routerView/ownTask.vue'],resolve)
      },{
      	path:'partTask',
      	name:'partTask',
      	component: resolve=>require(['@/components/routerView/partTask.vue'],resolve)
      },{
      	path:'completeTask',
      	name:'completeTask',
      	component: resolve=>require(['@/components/routerView/completeTask.vue'],resolve)
      },{
      	path:'/',
      	redirect:'allTask'
      }]
    },
    {
      path: '/',
      redirect:'/index'
    }
  ]
})
