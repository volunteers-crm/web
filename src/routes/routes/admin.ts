import { ROUTE_ADMIN_APPEALS_INDEX, ROUTE_ADMIN_APPEALS_SHOW, ROUTE_ADMIN_CHANNELS, ROUTE_ADMIN_DASHBOARD } from '@/routes/names'

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
                path: 'appeals',
                component: () => import('@/components/pages/empty.vue'),
                meta: {
                    layout: LAYOUT_ADMIN,
                    title: 'Appeals',
                    icon: 'mdi-heart-pulse',
                    requiresAuth: true
                },
                children: [
                    {
                        path: '',
                        name: ROUTE_ADMIN_APPEALS_INDEX,
                        component: () => import('@/pages/admin/appeals/index.vue'),
                        meta: {
                            layout: LAYOUT_ADMIN,
                            title: 'Appeals',
                            requiresAuth: true
                        }
                    },
                    {
                        path: ':id',
                        name: ROUTE_ADMIN_APPEALS_SHOW,
                        component: () => import('@/pages/admin/appeals/show.vue'),
                        meta: {
                            layout: LAYOUT_ADMIN,
                            title: 'Appeal #:id',
                            requiresAuth: true
                        }
                    }
                ]
            },
            {
                path: 'channels',
                name: ROUTE_ADMIN_CHANNELS,
                component: () => import('@/pages/admin/channels.vue'),
                meta: {
                    layout: LAYOUT_ADMIN,
                    title: 'Channels',
                    icon: 'mdi-forum',
                    requiresAuth: true
                }
            }
        ]
    }
]
