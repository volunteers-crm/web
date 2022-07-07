import _ from 'lodash'

import api from '@/plugins/axios'
import { usePageStore } from '@/store'

export default {
    set: (url: string, content: any) => _.set(usePageStore().$state.items, url, content),

    load: async (url: string) => {
        const response = await api.get(url)

        usePageStore().set(url, response.data)
    }
}
