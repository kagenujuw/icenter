import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  linkActiveClass:'active',
  routes: [
  	{
      path: '/index',
      // name: 'index',
      component: resolve=>require(['@/components/index.vue'],resolve),
      children:[{
      	path:'allTask',
      	name:'allTask',
      	component: resolve=>require(['@/components/allTask.vue'],resolve)
      },{
      	path:'ownTask',
      	name:'ownTask',
      	component: resolve=>require(['@/components/ownTask.vue'],resolve)
      },{
      	path:'partTask',
      	name:'partTask',
      	component: resolve=>require(['@/components/partTask.vue'],resolve)
      },{
      	path:'completeTask',
      	name:'completeTask',
      	component: resolve=>require(['@/components/completeTask.vue'],resolve)
      },{
      	path:'/',
      	redirect:'allTask'
      }]
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      redirect:'/index'
    }
  ]
})
