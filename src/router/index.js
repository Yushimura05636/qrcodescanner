import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import QrScanner from '../views/QrScanner.vue';

const routes = [
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
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
//# sourceMappingURL=index.js.map