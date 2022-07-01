import {ROUTE_USER_MAIN} from "./names";
import {LAYOUT_USER} from "../constants/layouts";

import IndexPage from '@/pages/main/Index.vue'

export default [
    {
        path: '/',
        name: ROUTE_USER_MAIN,
        component: IndexPage,
        meta: {
            layout: LAYOUT_USER
        }
    }
]
