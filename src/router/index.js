import Vue from 'vue'
import Router from 'vue-router'
import HwdTopView from '@/components/HwdTopView'
import HwdLogin from '@/components/HwdLogin'
import HwdSignup from '@/components/HwdSignup'
import HwdThreadList from '@/components/HwdThreadList'
import HwdThreadView from '@/components/HwdThreadView'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HwdTopView',
      component: HwdTopView,
    },
    {
      path: '/thread',
      name: 'HwdThreadList',
      component: HwdThreadList,
    },
    {
      path: '/thread/:id',
      name: 'HwdThreadView',
      component: HwdThreadView,
    },
  ],
})

export default router
