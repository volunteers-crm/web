import { ROUTE_ADMIN_DASHBOARD, ROUTE_MAIN, ROUTE_SIGN_IN } from '@/routes/names'
import { API_URL_ME } from '@/constants/api_routes'

import router from '@/routes'
import api from '@/plugins/axios'

import { useAuthStore, useUserStore } from '@/store'

export function login()
{
    return api
        .get(API_URL_ME)
        .then((response: any) => {
            const userStore = useUserStore()

            userStore.set(response?.data)

            router.push({ name: ROUTE_ADMIN_DASHBOARD })
        })
        .catch(() => router.push({ name: ROUTE_SIGN_IN }))
}

export function logout()
{
    useUserStore().logout()
    useAuthStore().forget()

    router.push({ name: ROUTE_MAIN })
}
