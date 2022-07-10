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

interface Storage
{
    count: number
}

interface Roles
{
    count: number
}

interface SettingsStore
{
    locale: string,

    menu: Menu,
    timeout: Timeout,
    storage: Storage,
    roles: Roles
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
        },

        storage: {
            count: 20
        },

        roles: {
            count: 50
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
