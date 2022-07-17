import { ROUTE_SIGN_IN } from '@/routes/names'

import { useUserStore } from '@/stores/user'

const auth = async (to: any, from: any, next: any) => {
    if (useUserStore().hasLogged) {
        return next()
    }

    return next({ name: ROUTE_SIGN_IN })
}

export default auth
