import {API_URL_ME} from "@/constants/api_routes";
import {ROUTE_SIGN_IN} from "@/routes/names";

import api from '@/plugins/axios'

import {getToken} from "@/plugins/auth";

import store from "@/store";

const authentication = async (to: any, from: any, next: any) => {
    if (store.getters['user/isLogged']) {
        return next()
    }

    if (getToken()) {
        return await api
            .get(API_URL_ME)
            .then((response: any) => {
                store.commit('user/setUser', response?.data)

                return next()
            })
            .catch(() => next({name: ROUTE_SIGN_IN}))
    }

    return next({name: ROUTE_SIGN_IN})
}

export default authentication
