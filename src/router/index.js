import { createRouter, createWebHistory } from 'vue-router';
import AboutView from '../views/AboutView.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import QrScanner from '../views/QrScanner.vue';
import TimeHistory from '../views/TimeHistory.vue';
import ProfileView from '../views/ProfileView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Login
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/scanner',
        name: 'scanner',
        component: QrScanner
    },
    {
        path: '/history',
        name: 'history',
        component: TimeHistory
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL || ''),
    routes
});

export default router;
//# sourceMappingURL=index.js.map