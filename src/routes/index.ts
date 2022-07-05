import {createRouter, createWebHistory} from "vue-router";

import pageTitleMiddleware from '@/routes/middlewares/page_title'
import authMiddleware from '@/routes/middlewares/auth'

import user from '@/routes/routes/user'
import manage from '@/routes/routes/manage'
import fallback from '@/routes/routes/fallback'

const router = createRouter({
    history: createWebHistory(),

    routes: [...user, ...manage, ...fallback]
})

router.beforeEach(pageTitleMiddleware)

router.beforeResolve(async (to: any, from: any, next: any) => {
    if (to?.meta?.requiresAuth) {
        return await authMiddleware(to, from, next)
    }

    next()
})

export default router
