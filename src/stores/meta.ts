import { defineStore } from 'pinia'
import { trans } from 'laravel-vue-i18n'
import _ from 'lodash'

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
        setPageTitle(title?: string, params?: object)
        {
            title = trans(title || '')

            _.each(params || {}, (value: any, key: string) => {
                title = title?.replace(`:${ key }`, value)
            })

            this.$state.pageTitle = title

            document.title = title || APPLICATION_TITLE

            if (document.title !== APPLICATION_TITLE) {
                document.title += ` - ${ APPLICATION_TITLE }`
            }
        }
    }
})
