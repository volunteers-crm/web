import { createPinia } from 'pinia'
import { useSettingsStore } from '@/stores/settings'

const pinia = createPinia()

const settingsStore = useSettingsStore(pinia)

const lang = settingsStore.locale

const resolve = (lang: string) => import(`../lang/${ lang }.json`)

export default { lang, resolve }
