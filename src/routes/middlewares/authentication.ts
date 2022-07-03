import {API_URL_ME} from "@/constants/api_routes";
import {ROUTE_MAIN} from "@/routes/names";

import {useRouter} from "vue-router";

import {getToken} from "@/plugins/auth";

import api from '@/plugins/axios'
import {useStore} from "vuex";

const router = useRouter()
const store = useStore()

const authentication = async (to: any, from: any, next: any) => {
    if (store.getters['user/hasUser']) {
        return next()
    }

    if (getToken()) {
        return await api
            .get(API_URL_ME)
            .then((response: any) => {
                store.commit('user/setUser', response?.data)

                return next()
            })
            .catch(() => {
                router.push({
                    name: ROUTE_MAIN
                })
            })
    }

    return false
}

export default authentication
