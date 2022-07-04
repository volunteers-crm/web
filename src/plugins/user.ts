import {ROUTE_ADMIN_DASHBOARD, ROUTE_MAIN, ROUTE_SIGN_IN} from "@/routes/names";
import {API_URL_ME} from "@/constants/api_routes";

import {forgetToken} from "@/plugins/auth";

import store from "@/store";
import router from '@/routes'

import api from "@/plugins/axios";

export function login() {
    return api
        .get(API_URL_ME)
        .then((response: any) => {
            store.commit('user/setUser', response?.data)

            router.push({name: ROUTE_ADMIN_DASHBOARD})
        })
        .catch(() => router.push({name: ROUTE_SIGN_IN}))
}

export function logout() {
    store.commit('user/logout')

    forgetToken()

    router.push({name: ROUTE_MAIN})
}
