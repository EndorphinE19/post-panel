import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/log',
    name: 'LogIn',
    component: () => import('../views/LogIn.vue')
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('../views/posts.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
