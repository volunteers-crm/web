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

    getters: {
        has: (state: AuthStore): boolean => !! state.token
    },

    actions: {
        set(token: string | null)
        {
            this.$state.token = token
        },

        forget()
        {
            this.set(null)
        }
    }
})
