import { defineStore } from 'pinia'

interface User
{
    id: number | null,
    username: string | null,
    name: string | null,
    avatar: string | null
}

interface UserStore
{
    token: string | null,

    user: User
}

export const useUserStore = defineStore({
    id: 'user',

    persist: true,

    state: (): UserStore => ({
        token: null,

        user: {
            id: null,
            username: null,
            name: null,
            avatar: null
        }
    }),

    getters: {
        hasLogged: (state: UserStore): boolean => !! state.token && !! state.user.id
    },

    actions: {
        setToken(token: string)
        {
            this.$state.token = token.trim()
        },

        setUser(user: User)
        {
            this.$state.user = Object.assign(this.user, user)
        },

        logout()
        {
            this.$reset()
        }
    }
})
