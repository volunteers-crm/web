import { useSettingsStore } from '@/store'

const settingsStore = useSettingsStore()

const lang = settingsStore.locale

const resolve = (lang: string) => import(`../lang/${ lang }.json`)

export default { lang, resolve }
