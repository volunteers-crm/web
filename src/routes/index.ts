import {createRouter, createWebHistory} from "vue-router";

import pageTitleMiddleware from '@/routes/middlewares/page_title'

import routes from "./routes";

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(pageTitleMiddleware)

export default router
