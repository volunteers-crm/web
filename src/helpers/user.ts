import { ROUTE_ADMIN_DASHBOARD, ROUTE_MAIN, ROUTE_SIGN_IN } from '@/routes/names'
import { API_URL_ME } from '@/constants/api_routes'

import router from '@/routes'

import axios from 'axios'

import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

export function login()
{
    return axios
        .get(API_URL_ME)
        .then((response: any) => {
            useUserStore().set(response?.data)

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
