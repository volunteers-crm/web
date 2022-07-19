import { defineStore } from 'pinia'

interface UserStore
{
    id: number | null,
    username: string | null,
    name: string | null,
    avatar: string | null
}

export const useUserStore = defineStore({
    id: 'user',

    state: (): UserStore => ({
        id: null,
        username: null,
        name: null,
        avatar: null
    }),

    getters: {
        hasLogged: (state: UserStore): boolean => !! state.id
    },

    actions: {
        set(user: User)
        {
            this.$state = Object.assign(this.$state, user)
        },

        logout()
        {
            this.$reset()
        }
    }
})
