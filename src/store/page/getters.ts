import { Page } from '@/contracts/store/Page'

import _ from 'lodash'

export default {
    has: (state: Page) => (url: string) => _.has(state.items, url),
    get: (state: Page) => (url: string) => _.get(state.items, url)
}
