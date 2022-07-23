import { Pinia } from 'pinia'
import { useSettingsStore } from '@/stores/settings'

export default (pinia: Pinia) => {
    const lang = useSettingsStore(pinia).locale

    const resolve = (lang: string) => import(`../../lang/${ lang }.json`)

    return { lang, resolve }
}
