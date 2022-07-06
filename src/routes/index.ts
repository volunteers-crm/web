import {APPLICATION_TITLE} from "@/constants/meta";

import {createRouter, createWebHistory} from "vue-router";
import authMiddleware from '@/routes/middlewares/auth'

import user from '@/routes/routes/user'
import manage from '@/routes/routes/manage'
import fallback from '@/routes/routes/fallback'
import {setPageTitle} from "@/plugins/locale";

const router = createRouter({
    history: createWebHistory(),

    routes: [...user, ...manage, ...fallback]
})

router.beforeEach((to: any, from: any, next: any) => {
    setPageTitle(to, to?.meta?.title || APPLICATION_TITLE)

    next()
})

router.beforeResolve(async (to: any, from: any, next: any) => {
    if (to?.meta?.requiresAuth) {
        return await authMiddleware(to, from, next)
    }

    next()
})

export default router
