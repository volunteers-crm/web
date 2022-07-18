import { ROUTE_ABOUT, ROUTE_BECOME, ROUTE_MAIN, ROUTE_SIGN_IN } from '@/routes/names'

import { LAYOUT_DEFAULT } from '@/constants/layouts'

export default [
    {
        path: '/',
        name: ROUTE_MAIN,
        component: () => import('@/pages/index.vue'),
        meta: {
            layout: LAYOUT_DEFAULT,
            title: 'Home',
            show: true
        }
    },
    {
        path: '/become',
        name: ROUTE_BECOME,
        component: () => import('@/pages/become.vue'),
        meta: {
            layout: LAYOUT_DEFAULT,
            title: 'Become a coordinator',
            requiresAuth: true,
            show: true
        }
    },
    {
        path: '/about',
        name: ROUTE_ABOUT,
        component: () => import('@/pages/about.vue'),
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
            title: 'Sign In'
        }
    }
]
