import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OneView from '@/views/OneView.vue'
import TwoView from '@/views/TwoView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/one',
    name: 'one',
    component: OneView,
  },
  {
    path: '/two',
    name: 'two',
    component: TwoView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
