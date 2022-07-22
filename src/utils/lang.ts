import { Pinia } from 'pinia'
import { useSettingsStore } from '@/stores/settings'

export default (pinia: Pinia) => {
    const lang = useSettingsStore(pinia).locale

    const resolve = async (lang: string) => {
        const files = import.meta.glob('../../lang/*.json')

        return await files[`../../lang/${ lang }.json`]()
    }

    return { lang, resolve }
}
