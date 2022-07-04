import {ROUTE_ADMIN_DASHBOARD} from "@/routes/names";

import {LAYOUT_ADMIN} from "@/constants/layouts";

export default [
    {
        path: '/manage',
        component: () => import('@/components/pages/empty.vue'),
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
        ]
    }
]
