import { ROUTE_SIGN_IN } from '@/routes/names'

import { login } from '@/helpers/user'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

const auth = async (to: any, from: any, next: any) => {
    if (useUserStore().isLogged) {
        return next()
    }

    if (useAuthStore().has) {
        return await login()
    }

    return next({ name: ROUTE_SIGN_IN })
}

export default auth
