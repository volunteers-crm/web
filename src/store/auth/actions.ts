import { useAuthStore } from '@/store'

export default {
    set: (token: string | null) => {
        useAuthStore().$state.token = token
    },

    forget: () => useAuthStore().set(null)
}
