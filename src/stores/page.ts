import _ from 'lodash'
import axios from 'axios'

import { defineStore } from 'pinia'

interface PageItem
{
    [url: string]: object
}

interface PageStore
{
    items: PageItem
}

export const usePageStore = defineStore({
    id: 'page',

    persist: {
        storage: sessionStorage
    },

    state: (): PageStore => ({
        items: {}
    }),

    getters: {
        has: (state: PageStore) => (url: string) => _.has(state.items, url),
        get: (state: PageStore) => (url: string) => _.get(state.items, url)
    },

    actions: {
        set(url: string, content: any)
        {
            _.set(this.$state.items, url, content)
        },

        async load(url: string)
        {
            const response = await axios.get(url)

            this.set(url, response.data)
        }
    }
})
