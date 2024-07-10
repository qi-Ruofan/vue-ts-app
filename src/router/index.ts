import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    menu?: boolean
    title?: string
    icon?: string
    auth?: boolean
  }
}
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/Home.vue'),
    redirect: '/sign',
    meta: {
      menu: true,
      title: '考勤管理',
      icon: 'document-copy',
      auth: true
    },
    children: [
      {
        path: '/check',
        name: 'Check',
        component: () => import('@/views/Check/Check.vue'),
        meta: {
          menu: true,
          title: '我的考勤审批',
          icon: 'finished',
          auth: true
        },
      },
      {
        path: '/apply',
        name: 'Apply',
        component: () => import('@/views/Apply/Apply.vue'),
        meta: {
          menu: true,
          title: '添加考勤审批',
          icon: 'document-add',
          auth: true
        },
      },
      {
        path: '/exception',
        name: 'Exception',
        component: () => import('@/views/Exception/Exception.vue'),
        meta: {
          menu: true,
          title: '异常考勤查询',
          icon: 'warning',
          auth: true
        },
      },
      {
        path: '/sign',
        name: 'Sign',
        component: () => import('@/views/Sign/Sign.vue'),
        meta: {
          menu: true,
          title: '在线打卡签到',
          icon: 'calendar',
          auth: true
        },
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
