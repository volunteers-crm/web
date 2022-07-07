import { APPLICATION_TITLE } from '@/constants/meta'

import { useMetaStore } from '@/store'
import { trans } from 'laravel-vue-i18n'

export default {
    setPageTitle: (title?: string) => {
        const metaStore = useMetaStore()

        const value = trans(title || '')

        metaStore.$state.pageTitle = value

        document.title = value || APPLICATION_TITLE

        if (document.title !== APPLICATION_TITLE) {
            document.title += ` - ${ APPLICATION_TITLE }`
        }
    }
}
