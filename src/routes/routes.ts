import {ROUTE_MAIN} from "./names";

import {LAYOUT_DEFAULT} from "../constants/layouts";

export default [
    {
        path: '/',
        name: ROUTE_MAIN,
        component: () => import('@/pages/main/index.vue'),
        meta: {
            layout: LAYOUT_DEFAULT
        }
    }
]
