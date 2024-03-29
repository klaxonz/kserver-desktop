import { createRouter, createWebHashHistory, RouterOptions, Router, RouteRecordRaw } from 'vue-router'
//由于router的API默认使用了类型进行初始化，内部包含类型定义，所以本文内部代码中的所有数据类型是可以省略的
//RouterRecordRaw是路由组件对象
const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Login', component: () => import('@/page/LoginPage.vue') },
  {
    path: '/webpage',
    name: 'webpage',
    component: () => import('@/page/WebPageResourcePage.vue'),
    children: [
      {
        path: 'collect',
        component: () => import('@/page/WebPageCollectPage.vue')
      },
      {
        path: 'video',
        component: () => import('@/page/VideoManagerPage.vue')
      },
      {
        path: 'task',
        component: () => import('@/page/WebPageTaskPage.vue')
      }
    ]
  }
]

// RouterOptions是路由选项类型
const options: RouterOptions = {
  history: createWebHashHistory(),
  routes
}

// Router是路由对象类型
const router: Router = createRouter(options)

export default router
