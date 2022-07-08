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
    isLogged: boolean,

    user: User
}

export const useUserStore = defineStore({
    id: 'user',

    state: (): UserStore => ({
        isLogged: false,

        user: {
            id: null,
            username: null,
            name: null,
            avatar: null
        }
    }),

    getters: {
        get: (state: UserStore): User => state.user
    },

    actions: {
        set(user: User)
        {
            this.$state.user = Object.assign(this.user, user)

            this.$state.isLogged = true
        },

        logout()
        {
            this.$reset()
        }
    }
})
