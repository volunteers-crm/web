import { defineStore } from 'pinia'

interface Menu
{
    rail: boolean
}

interface Timeout
{
    admin: {
        dashboard: number
    }
}

interface Count
{
    count: number
}

interface SettingsStore
{
    locale: string,

    menu: Menu,
    timeout: Timeout,
    storage: Count,
    roles: Count,
    text: Count
}

export const useSettingsStore = defineStore({
    id: 'settings',

    persist: {
        storage: localStorage,
        paths: ['locale', 'menu']
    },

    state: (): SettingsStore => ({
        locale: 'en',

        menu: {
            rail: false
        },

        timeout: {
            admin: {
                dashboard: 10
            }
        },

        storage: {
            count: 20
        },

        roles: {
            count: 50
        },

        text: {
            count: 3000
        }
    }),

    actions: {
        setLocale(locale: string)
        {
            this.$state.locale = locale
        },

        toggleMenuRail()
        {
            this.$state.menu.rail = ! this.menu.rail
        },

        setTimeoutAdminDashboard(timeout: number)
        {
            this.$state.timeout.admin.dashboard = timeout
        }
    }
})
