import { defineStore } from 'pinia'
import { trans } from 'laravel-vue-i18n'

import { APPLICATION_TITLE } from '@/constants/meta'

interface MetaStore
{
    pageTitle: string | null
}

export const useMetaStore = defineStore({
    id: 'meta',

    state: (): MetaStore => ({
        pageTitle: null
    }),

    actions: {
        setPageTitle(title?: string)
        {
            title = trans(title || '')

            this.$state.pageTitle = title

            document.title = title || APPLICATION_TITLE

            if (document.title !== APPLICATION_TITLE) {
                document.title += ` - ${ APPLICATION_TITLE }`
            }
        }
    }
})
