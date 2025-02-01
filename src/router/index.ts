import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/scanner',
    name: 'scanner',
    component: () => import('../views/QrScanner.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/TimeHistory.vue')
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
  },
  {
    path: '/memes',
    name: 'memes',
    component: () => import('../views/Memes.vue')
  },
  {
    path: '/view',
    name: 'view',
    component: () => import('../views/View.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
