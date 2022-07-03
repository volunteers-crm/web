import {ROUTE_ABOUT, ROUTE_MAIN, ROUTE_SIGN_IN} from "./names";

import {LAYOUT_DEFAULT} from "@/constants/layouts";

import {trans} from "laravel-vue-i18n";

export default [
    {
        path: '/',
        name: ROUTE_MAIN,
        component: () => import('@/pages/main/index.vue'),
        meta: {
            layout: LAYOUT_DEFAULT,
            title: trans('Home'),
            show: true
        }
    },
    {
        path: '/about',
        name: ROUTE_ABOUT,
        component: () => import('@/pages/about/index.vue'),
        meta: {
            layout: LAYOUT_DEFAULT,
            title: trans('About Us'),
            show: true
        }
    },
    {
        path: '/sign-in',
        name: ROUTE_SIGN_IN,
        component: () => import('@/pages/auth/sign-in.vue'),
        meta: {
            title: trans('Sign In')
        }
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('@/pages/errors/404.vue')
    }
]
