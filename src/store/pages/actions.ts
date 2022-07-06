import api from "@/plugins/axios";

export default {
    load: async ({commit}: any, url: string) => {
        const response = await api.get(url);

        commit('setPage', url, response.data)
    },

    loadMissing: async ({commit, getters, dispatch}: any, url: string) => {
        if (!getters['hasPage'](url)) {
            await dispatch('load', url)
        }
    }
}
