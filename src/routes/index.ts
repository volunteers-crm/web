import {createRouter, createWebHistory} from "vue-router";

import pageTitleMiddleware from '@/routes/middlewares/page_title'

import user from '@/routes/routes/user'
import manage from '@/routes/routes/manage'
import fallback from '@/routes/routes/fallback'

const router = createRouter({
    history: createWebHistory(),

    routes: [...user, ...manage, ...fallback]
})

router.beforeEach(pageTitleMiddleware)

export default router
