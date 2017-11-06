import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Todo from '@/components/Todo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/todo',
      name: 'Todo',
      component: Todo
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
  ]
})
