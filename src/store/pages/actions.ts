import api from "@/plugins/axios";

import {API_URL_PAGE} from "@/constants/api_routes";

export default {
    load: async ({commit}: any, slug: string) => {
        const response = await api.get(API_URL_PAGE.replace(':slug', slug));

        commit('setPage', slug, response.data.title, response.data.content)
    },

    loadMissing: async ({commit, getters, dispatch}: any, slug: string) => {
        if (!getters['hasPage'](slug)) {
            await dispatch('load', slug)
        }
    }
}
