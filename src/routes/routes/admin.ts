import { ROUTE_ADMIN_DASHBOARD, ROUTE_ADMIN_ISSUES_INDEX, ROUTE_ADMIN_ISSUES_SHOW } from '@/routes/names'

import { LAYOUT_ADMIN } from '@/constants/layouts'

export default [
    {
        path: '/manage',
        component: () => import('@/components/pages/empty.vue'),
        meta: {
            title: 'Dashboard',
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: ROUTE_ADMIN_DASHBOARD,
                component: () => import('@/pages/admin/dashboard.vue'),
                meta: {
                    layout: LAYOUT_ADMIN,
                    title: 'Dashboard',
                    icon: 'mdi-view-dashboard',
                    requiresAuth: true
                }
            },
            {
                path: 'issues',
                component: () => import('@/components/pages/empty.vue'),
                meta: {
                    layout: LAYOUT_ADMIN,
                    title: 'Issues',
                    icon: 'mdi-card-account-details',
                    requiresAuth: true
                },
                children: [
                    {
                        path: '',
                        name: ROUTE_ADMIN_ISSUES_INDEX,
                        component: () => import('@/pages/admin/issues/index.vue'),
                        meta: {
                            layout: LAYOUT_ADMIN,
                            title: 'Issues',
                            requiresAuth: true
                        }
                    },
                    {
                        path: ':id',
                        name: ROUTE_ADMIN_ISSUES_SHOW,
                        component: () => import('@/pages/admin/issues/show.vue'),
                        meta: {
                            layout: LAYOUT_ADMIN,
                            title: 'Issue #:id',
                            requiresAuth: true
                        }
                    }
                ]
            }
        ]
    }
]
