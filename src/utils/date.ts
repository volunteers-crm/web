import { Pinia } from 'pinia'
import dayjs from 'dayjs'

import 'dayjs/locale/en'
import 'dayjs/locale/de'
import 'dayjs/locale/ru'

import { useSettingsStore } from '@/stores/settings'

import advancedFormat from 'dayjs/plugin/advancedFormat'
import parseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

export const initDate = (pinia: Pinia) => {
    const lang = useSettingsStore(pinia).locale.toLowerCase().replace('_', '-')

    dayjs.extend(advancedFormat)
    dayjs.extend(parseFormat)
    dayjs.extend(utc)
    dayjs.extend(timezone)

    dayjs.locale(lang)
}
