import {ROUTE_SIGN_IN} from "@/routes/names";

import {getToken} from "@/plugins/auth";
import {login} from "@/plugins/user";

import store from "@/store";

const auth = async (to: any, from: any, next: any) => {
    if (store.getters['user/isLogged']) {
        return next()
    }

    if (getToken()) {
        return await login()
    }

    return next({name: ROUTE_SIGN_IN})
}

export default auth
