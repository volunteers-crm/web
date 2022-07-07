import { ROUTE_SIGN_IN } from '@/routes/names'

import { login } from '@/plugins/user'
import { useAuthStore, useUserStore } from '@/store'

const auth = async (to: any, from: any, next: any) => {
    if (useUserStore().isLogged) {
        return next()
    }

    if (useAuthStore().token) {
        return await login()
    }

    return next({ name: ROUTE_SIGN_IN })
}

export default auth
