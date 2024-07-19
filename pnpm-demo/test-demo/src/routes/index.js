import { createRouter, createWebHashHistory  } from "vue-router";


const routes = [
  {
    path:'/home',
    name:'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/',
    redirect:'/home'
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
// 导出
export default router