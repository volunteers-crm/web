import { defineStore } from 'pinia'

interface UserStore
{
    token: string | null,
    telegramToken: string | null,
    user: User
}

export const useUserStore = defineStore({
    id: 'user',

    persist: {
        storage: localStorage,
        paths: ['token', 'telegramToken']
    },

    state: (): UserStore => ({
        token: null,
        telegramToken: null,

        user: {
            id: null,
            username: null,
            name: null,
            avatar: null
        }
    }),

    getters: {
        hasLogged: (state: UserStore): boolean => !! state.user.id
    },

    actions: {
        setUser(user: User)
        {
            this.$state.user = user
        },

        setToken(token: string, telegramToken: string)
        {
            this.$state.token = token
            this.$state.telegramToken = telegramToken
        },

        logout()
        {
            this.$reset()
        }
    }
})
