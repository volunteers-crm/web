import { Settings } from '@/contracts/store/Settings'

export default {
    locale: (state: Settings): string => state.locale,

    menuRail: (state: Settings): boolean => state.menu.rail,

    timeoutAdminDashboard: (state: Settings): number => state.timeout.admin.dashboard
}
