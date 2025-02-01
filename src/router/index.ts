import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Login.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import QrScanner from '../views/QrScanner.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/QrScanner',
    name: 'QrScanner',
    component: QrScanner
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
