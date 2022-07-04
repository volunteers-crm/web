import {APPLICATION_TITLE} from "@/constants/meta";

import store from '@/store'

export default (to: any, from: any, next: any) => {
    const title = to?.meta?.title || APPLICATION_TITLE

    document.title = title

    if (document.title !== APPLICATION_TITLE) {
        document.title += ` - ${APPLICATION_TITLE}`
    }

    store.commit('meta/setPageTitle', title)

    next()
}
