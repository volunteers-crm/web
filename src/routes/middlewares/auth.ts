import { ROUTE_SIGN_IN } from '@/routes/names'
import { API_AUTH_ME } from '@/constants/api_routes'

import { useUserStore } from '@/stores/user'

import axios from 'axios'

const auth = async (to: any, from: any, next: any) => {
    const userStore = useUserStore()

    if (userStore.hasLogged) {
        return next()
    }

    if (userStore.token) {
        return await axios
            .get(API_AUTH_ME)
            .then(response => {
                userStore.setUser(response.data)

                return next()
            })
    }

    return next({ name: ROUTE_SIGN_IN })
}

export default auth
