import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import type { StateAll } from '@/store'
import _ from 'lodash'
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
    path: '/',
    name: 'home',
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
        path: 'sign',
        name: 'sign',
        component: () => import('@/views/Sign/Sign.vue'),
        meta: {
          menu: true,
          title: '在线打卡签到',
          icon: 'calendar',
          auth: true
        },
        async beforeEnter(to, from, next) {
          const usersInfos = (store.state as StateAll).users.infos;
          const signsInfos = (store.state as StateAll).signs.infos;
          const newsInfo = (store.state as StateAll).news.info
            if(_.isEmpty(signsInfos)) {
              const res = await store.dispatch('signs/getTime', { userid: usersInfos._id })
              if(res.data.errcode === 0) {
                store.commit('signs/updateInfos', res.data.infos)
              }
              else {
                return
              }
            } 
            if(_.isEmpty(newsInfo)) {
              const res = await store.dispatch('news/getRemind', { userid: usersInfos._id })
              if(res.data.errcode === 0) {
                store.commit('news/updateInfo', res.data.info)
              }
              else {
                return
              }
            }
          next()
        }
      },
      {
        path: 'check',
        name: 'check',
        component: () => import('@/views/Check/Check.vue'),
        meta: {
          menu: true,
          title: '我的考勤审批',
          icon: 'finished',
          auth: true
        },
        async beforeEnter(to, from, next) {
          const usersInfos = (store.state as StateAll).users.infos;
          const checkList = (store.state as StateAll).checks.checkList;
          const newsInfo = (store.state as StateAll).news.info
          if(_.isEmpty(checkList)) {
            const res = await store.dispatch('checks/getApplyList', { approverid: usersInfos._id })
            if(res.data.errcode === 0) {
              store.commit('checks/updateCheckList', res.data.rets)
            }
            else {
              return
            }
          }
          if(newsInfo.approver) {
            const res = await store.dispatch('news/putRemind', {userid: usersInfos._id, approver: false})
            if(res.data.errcode === 0) {
              store.commit('news/updateInfo', res.data.info)
            }
            else {
              return
            }
          }
          next()
        }
      },
      {
        path: 'apply',
        name: 'apply',
        component: () => import('@/views/Apply/Apply.vue'),
        meta: {
          menu: true,
          title: '添加考勤审批',
          icon: 'document-add',
          auth: true
        },
        async beforeEnter(to, form, next) {
          const usersInfos = (store.state as StateAll).users.infos;
          const checksApplyList = (store.state as StateAll).checks.applyList
          const newsInfo = (store.state as StateAll).news.info
          if(_.isEmpty(checksApplyList)) {
            const res = await store.dispatch('checks/getApplyList', { applicantid: usersInfos._id })
            if(res.data.errcode === 0) {
              store.commit('checks/updateApplyList', res.data.rets)
            }
            else {
              return
            }
          }
          if(newsInfo.applicant) {
            const res = await store.dispatch('news/putRemind', {userid: usersInfos._id, applicant: false})
            if(res.data.errcode === 0) {
              store.commit('news/updateInfo', res.data.info)
            }
            else {
              return
            }
          }
          next()
        }
      },
      {
        path: 'exception',
        name: 'exception',
        component: () => import('@/views/Exception/Exception.vue'),
        meta: {
          menu: true,
          title: '异常考勤查询',
          icon: 'warning',
          auth: true
        },
        async beforeEnter(to, from, next) {
          const usersInfos = (store.state as StateAll).users.infos;
          const signsInfos = (store.state as StateAll).signs.infos;
          const checksApplyList = (store.state as StateAll).checks.applyList
          const newsInfo = (store.state as StateAll).news.info
          if(_.isEmpty(signsInfos)) {
            const res = await store.dispatch('signs/getTime', { userid: usersInfos._id })
            if(res.data.errcode === 0) {
              store.commit('signs/updateInfos', res.data.infos)
              next()
            }
            else {
              return
            }
          } 
          if(_.isEmpty(checksApplyList)) {
            const res = await store.dispatch('checks/getApplyList', { applicantid: usersInfos._id })
            if(res.data.errcode === 0) {
              store.commit('checks/updateApplyList', res.data.rets)
            }
            else {
              return
            }
          }
          if(_.isEmpty(newsInfo)) {
            const res = await store.dispatch('news/getRemind', { userid: usersInfos._id })
            if(res.data.errcode === 0) {
              store.commit('news/updateInfo', res.data.info)
            }
            else {
              return
            }
          }
          next()
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 权限
router.beforeEach((to, from, next)=>{
  const token = (store.state as StateAll).users.token;
  const infos = (store.state as StateAll).users.infos;
  if( to.meta.auth && _.isEmpty(infos) ){
    if(token){
      store.dispatch('users/infos').then((res)=>{
        if(res.data.errcode === 0){
          store.commit('users/updateInfos', res.data.infos)
          next()
        }
      });
    }
    else{
      next('/login');
    }
  }
  else{
    if( token && to.path === '/login' ){
      next('/');
    }
    else{
      next();
    }
  }

})

export default router
