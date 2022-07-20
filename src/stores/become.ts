import { defineStore } from 'pinia'

interface BecomeForm
{
    bot: string | null,
    name: string | null,
    city: string | null,
    about: string | null,
    source: string | null,
    socials: string[],
    roles: number[],
    recommendations: string[],
    is_coordinator: boolean
}

interface BecomeStore
{
    bot: Bot,
    form: BecomeForm
}

export const useBecomeStore = defineStore({
    id: 'become',

    persist: true,

    state: (): BecomeStore => ({
        bot: {
            id: 0,
            username: '',
            name: '',
            timezone: '',
            locale: '',
            channels: [],
            roles: []
        },

        form: {
            bot: null,
            name: null,
            city: null,
            about: null,
            source: null,
            socials: [],
            roles: [],
            recommendations: [],
            is_coordinator: false
        }
    }),

    getters: {
        hasBot: (state: BecomeStore): boolean => !! state.bot.id
    },

    actions: {
        setBot(params: Bot)
        {
            this.$state.bot = params
        },

        reset()
        {
            this.$reset()
        }
    }
})
