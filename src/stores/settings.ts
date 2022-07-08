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

interface SettingsStore
{
    locale: string,

    menu: Menu,
    timeout: Timeout
}

export const useSettingsStore = defineStore({
    id: 'settings',

    persist: true,

    state: (): SettingsStore => ({
        locale: 'en',

        menu: {
            rail: false
        },

        timeout: {
            admin: {
                dashboard: 10
            }
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
