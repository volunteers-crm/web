import {useStore} from "vuex";

const store = useStore()

export default {
    getPage: async (state: any) => async (slug: string) => {
        if (state.items[slug] === undefined) {
            await store.dispatch('pages/load', {slug})
        }

        return state.items[slug]
    }
}
