import { useSettingsStore } from '@/store'

export default {
    setLocale: (locale: string) => useSettingsStore().$state.locale = locale,

    setMenuRail: (value: boolean) => useSettingsStore().$state.menu.rail = value,

    toggleMenuRail: () => {
        const store = useSettingsStore()

        store.$state.menu.rail = ! store.menuRail
    },

    setTimeoutAdminDashboard: (timeout: number) => useSettingsStore().$state.timeout.admin.dashboard = timeout
}
