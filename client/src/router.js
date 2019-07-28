import Vue from 'vue'
import Router from 'vue-router'
import {Ludus, Emperor, Home, NotFound} from './views'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ludus',
      name: 'ludus',
      component: Ludus
    },
    {
      path: '/emperor',
      name: 'emperor',
      component: Emperor
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
