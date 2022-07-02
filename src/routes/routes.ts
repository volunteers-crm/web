import {ROUTE_ABOUT, ROUTE_MAIN} from "./names";

import {LAYOUT_DEFAULT} from "@/constants/layouts";

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
    }
]
