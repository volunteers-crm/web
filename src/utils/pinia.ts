import { createPinia } from 'pinia'

import piniaPersistedState from 'pinia-plugin-persistedstate'

const pinia = createPinia()
    .use(piniaPersistedState)

export default pinia
