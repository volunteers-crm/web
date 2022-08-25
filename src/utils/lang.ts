import { Pinia } from 'pinia'
import { useSettingsStore } from '@/stores/settings'

export const langOptions = (store: Pinia) => {
    const lang = useSettingsStore(store).locale

    const resolve = (lang: string) => import(`../../lang/${ lang }.json`)

    return { lang, resolve }
}
