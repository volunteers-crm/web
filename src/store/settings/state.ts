import { Settings } from '@/contracts/store/Settings'

export default (): Settings => ({
    locale: 'en',

    menu: {
        rail: false
    },

    timeout: {
        admin: {
            dashboard: 10
        }
    }
})
