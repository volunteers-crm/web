import { defineStore } from 'pinia'

interface AuthStore
{
    token: string | null
}

export const useAuthStore = defineStore({
    id: 'auth',

    persist: true,

    state: (): AuthStore => ({
        token: null
    }),

    actions: {
        setToken(token: string)
        {
            this.$state.token = token.trim()
        },

        logout()
        {
            this.$reset()
        }
    }
})
