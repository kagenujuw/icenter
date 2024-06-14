import { createRouter, createWebHashHistory  } from "vue-router";


const routes = [
  {
    path:'/home',
    name:'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/preview/index.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test.vue')
  },
  {
    path: '/treeTable',
    name: 'treeTable',
    component: () => import('@/views/treeTable.vue')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('@/views/table.vue')
  },
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: () => import('@/views/timeline/index.vue')
  },
]
const router = createRouter({
  history: createWebHashHistory (),
  routes: routes
})
// 导出
export default router