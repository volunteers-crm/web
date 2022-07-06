import {ROUTE_ADMIN_DASHBOARD, ROUTE_ADMIN_ISSUES} from "@/routes/names";

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
                path: 'issues',
                name: ROUTE_ADMIN_ISSUES,
                component: () => import('@/pages/manage/issues.vue'),
                meta: {
                    layout: LAYOUT_ADMIN,
                    title: 'Issues',
                    icon: 'mdi-card-account-details'
                }
            }
        ]
    }
]
