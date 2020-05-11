import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/UserLogin'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    }
  ]
})
