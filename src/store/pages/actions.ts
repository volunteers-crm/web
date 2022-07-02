import api from "@/plugins/axios";

import {API_URL_PAGE} from "@/constants/api_routes";

export default {
    load: async ({commit}: any, slug: string) => {
        const response = await api.get(API_URL_PAGE.replace(':page', slug));

        commit('setPage', slug, response.data.title, response.data.content)
    }
}
