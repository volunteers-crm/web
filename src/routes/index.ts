import {createRouter, createWebHistory} from "vue-router";

import pageTitleMiddleware from '@/routes/middlewares/page_title'
import authenticationMiddleware from '@/routes/middlewares/authentication'

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
        return await authenticationMiddleware(to, from, next)
    }

    next()
})

export default router
