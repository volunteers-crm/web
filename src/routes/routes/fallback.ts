import { ROUTE_404 } from '@/routes/names'

export default [
    {
        path: '/:pathMatch(.*)*',
        name: ROUTE_404,
        component: () => import('@/pages/errors/404.vue')
    }
]
