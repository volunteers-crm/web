import { APPLICATION_TITLE } from '@/constants/meta'

import { createRouter, createWebHistory } from 'vue-router'
import authMiddleware from '@/routes/middlewares/auth'

import user from '@/routes/routes/user'
import manage from '@/routes/routes/manage'
import fallback from '@/routes/routes/fallback'
import { useMetaStore } from '@/store'

const router = createRouter({
    history: createWebHistory(),

    routes: [...user, ...manage, ...fallback]
})

router.beforeEach(async (to: any, from: any, next: any) => {
    if (to?.meta?.requiresAuth) {
        return await authMiddleware(to, from, next)
    }

    next()
})

router.beforeResolve((to: any, from: any, next: any) => {
    const metaStore = useMetaStore()

    metaStore.setPageTitle(to?.meta?.title || APPLICATION_TITLE)

    next()
})

export default router
