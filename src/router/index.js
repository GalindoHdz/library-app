import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login';
import Sigin from '../views/Sigin';
import Recover from '../views/Recover';
import Dashboard from '../views/Dashboard';
import Home from '../views/Home';
import Categories from '../views/Categories';
import Likes from '../views/Likes';
import Settings from '../views/Settings';
import NotFound from '../views/NotFound';
import store from '../store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/Sigin',
        name: 'Sigin',
        component: Sigin,
    },
    {
        path: '/Recover',
        name: 'Recover',
        component: Recover,
    },
    {
        path: '/Dashboard',
        component: Dashboard,
        meta: { requieresAuth: true },
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home,
            },
            {
                path: 'Categorias',
                name: 'Categories',
                component: Categories,
            },
            {
                path: 'Likes',
                name: 'Likes',
                component: Likes,
            },
            {
                path: 'Settings',
                name: 'Settings',
                component: Settings,
            },
        ],
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((route) => route.meta.requieresAuth)) {
        if (store.state.login.status) {
            next();
        } else {
            next('/');
        }
    } else {
        next();
    }
});

export default router;
