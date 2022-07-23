import { Pinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settings'
import { defaultLocale } from '@/constants/locales'

let translations: any = null

export const i18n = async (pinia: Pinia) => {
    const store = useSettingsStore(pinia)

    const locale = store.locale

    const messages = {
        [locale]: await import(`../../lang/${ locale }.json`)
    }

    const fallbackLocale = import.meta.env?.VUE_APP_I18N_FALLBACK_LOCALE || defaultLocale

    return translations = createI18n({
        locale,
        messages: messages,
        fallbackLocale,
        flatJson: true,
        legacy: false,
        globalInjection: true
    })
}

export const trans = (key: string, attributes = {}) => {
    return translations.global.t(key, attributes)
}
