import {ROUTE_ADMIN_DASHBOARD, ROUTE_ADMIN_SETTINGS} from "@/routes/names";

import {LAYOUT_ADMIN} from "@/constants/layouts";

export default [
    {
        path: '/manage',
        component: () => import('@/components/pages/empty.vue'),
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: ROUTE_ADMIN_DASHBOARD,
                component: () => import('@/pages/manage/dashboard.vue'),
                meta: {
                    layout: LAYOUT_ADMIN,
                    title: 'Dashboard',
                    icon: 'mdi-view-dashboard'
                },
            },
            {
                path: 'settings',
                name: ROUTE_ADMIN_SETTINGS,
                component: () => import('@/pages/manage/settings.vue'),
                meta: {
                    layout: LAYOUT_ADMIN,
                    title: 'Settings',
                    icon: 'mdi-cog'
                }
            }
        ]
    }
]
