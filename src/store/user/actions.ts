import { User } from '@/contracts/store/User'

import { useUserStore } from '@/store'

export default {
    set: (user: User): void => {
        const store = useUserStore()

        store.$state.user = Object.assign(store.$state.user, user)

        store.$state.isLogged = true
    },

    logout: (): void => useUserStore().$reset()
}
