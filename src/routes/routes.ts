import {ROUTE_ABOUT, ROUTE_ADMIN_DASHBOARD, ROUTE_MAIN, ROUTE_SIGN_IN} from "./names";

import {LAYOUT_ADMIN, LAYOUT_DEFAULT} from "@/constants/layouts";

export default [
    {
        path: '/',
        name: ROUTE_MAIN,
        component: () => import('@/pages/main/index.vue'),
        meta: {
            layout: LAYOUT_DEFAULT,
            title: 'Home',
            show: true
        }
    },
    {
        path: '/about',
        name: ROUTE_ABOUT,
        component: () => import('@/pages/about/index.vue'),
        meta: {
            layout: LAYOUT_DEFAULT,
            title: 'About Us',
            show: true
        }
    },
    {
        path: '/sign-in',
        name: ROUTE_SIGN_IN,
        component: () => import('@/pages/auth/sign-in.vue'),
        meta: {
            title: 'Sign In',
        }
    },
    {
        path: '/manage',
        name: ROUTE_ADMIN_DASHBOARD,
        component: () => import('@/pages/manage/dashboard.vue'),
        meta: {
            layout: LAYOUT_ADMIN,
            title: 'Dashboard',
        }
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('@/pages/errors/404.vue')
    }
]
