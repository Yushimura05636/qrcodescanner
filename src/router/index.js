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
    },
    // Catch all route for 404
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
    console.log('Navigating to:', to.path);
    next();
});

export default router;
//# sourceMappingURL=index.js.map