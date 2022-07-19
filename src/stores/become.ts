import { defineStore } from 'pinia'

interface BecomeStore
{
    id: number | null,
    username: string | null,
    name: string | null,
    timezone: string | null,
    locale: string | null,
    roles: RoleGroupByCategory[]
}

export const useBecomeStore = defineStore({
    id: 'become',

    state: (): BecomeStore => ({
        id: null,
        username: null,
        name: null,
        timezone: null,
        locale: null,
        roles: []
    }),

    actions: {
        set(params: Bot)
        {
            this.$state = Object.assign(this.$state, params)
        },

        reset()
        {
            this.$reset()
        }
    }
})
