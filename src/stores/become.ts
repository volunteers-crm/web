import { defineStore } from 'pinia'

interface BecomeForm
{
    bot: string,
    city: string,
    about: string,
    source: string,
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

    persist: {
        paths: [
            'form',
            'bot.id',
            'bot.name',
            'bot.roles'
        ]
    },

    state: (): BecomeStore => ({
        bot: {
            id: 0,
            name: '',
            title: '',
            timezone: '',
            locale: '',
            channels: [],
            roles: []
        },

        form: {
            bot: '',
            city: '',
            about: '',
            source: '',
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
