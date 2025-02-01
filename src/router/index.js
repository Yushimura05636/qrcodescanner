import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
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
        path: '/profile',
        name: 'profile',
        component: () => import('../views/ProfileView.vue')
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});
export default router;
//# sourceMappingURL=index.js.map