import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/UserLogin.vue')
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
    component: () => import('../views/memes.vue')
  },
  {
    path: '/view',
    name: 'view',
    component: () => import('../views/View.vue')
  },
  {
    path: '/user_login',
    name: 'user_login',
    component: () => import('../views/UserLogin.vue')
  },
  {
    path: '/user_dashboard/user/:id',
    name: 'user_dashboard',
    component: () => import('../views/UserDashboard.vue'),
    props: true
  },
  {
    path: '/forgot_password',
    name: 'forgot_password',
    component: () => import('../views/ForgotPassword.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

export const config = {
  API_URL: 'http://localhost:8000/api'
  //API_URL: 'https://qrscannerdb-production.up.railway.app/api'
}