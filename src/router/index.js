import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    showName: '首页',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    showName: '关于',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/animation',
    name: 'Animation',
    showName: '动画',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../packages/animation/index.vue'),
    children: [
      {
        path: '/animation/whirl',
        name: 'whirl',
        showName: 'whirl',
        component: () => import('../packages/animation/whirl.vue')
      },
      {
        path: '/animation/light',
        showName: 'light',
        name: 'light',
        component: () => import('../packages/animation/light.vue')
      },
      {
        path: '/animation/circulation',
        showName: 'circulation',
        name: 'circulation',
        component: () => import('../packages/animation/picture-bg.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
