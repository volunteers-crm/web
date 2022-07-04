export default [
    {
        path: '/:catchAll(.*)',
        component: () => import('@/pages/errors/404.vue')
    }
]
