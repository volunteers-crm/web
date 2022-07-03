import {ROUTE_ABOUT, ROUTE_MAIN} from "./names";

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
        path: '/:catchAll(.*)',
        component: () => import('@/pages/errors/404.vue')
    }
]
