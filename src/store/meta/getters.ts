import { Meta } from '@/contracts/store/Meta'

import { trans } from 'laravel-vue-i18n'

export default {
    pageTitle: (state: Meta): string => trans(state.pageTitle || '')
}
