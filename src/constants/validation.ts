import { trans } from '@/utils/lang'
import _ from 'lodash'
import { timezones } from '@/helpers/date'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()

export const nameRule = [
    (v: string) => !! v.trim() || trans('This field is required.'),
    (v: string) => v.trim().length >= 3 || trans('This field must be at least 3 characters.')
]

export const telegramBotUsernameRule = [
    (v: string) => !! v.trim() || trans('This field is required.'),
    (v: string) => _.endsWith(v.trim(), 'Bot') || _.endsWith(v.trim(), '_bot') || trans('This must end with one of the following: :values.', { values: 'Bot, _bot' }),
    (v: string) => /^(@|https:\/\/t.me\/)?[\d\w]+(_bot|Bot)$/.test(v.trim()) || trans('This format is invalid.')
]

export const telegramTokenRule = [
    (v: string) => ! v.trim() || /^\d{8,10}:[a-zA-Z\d_-]{35}$/.test(v.trim()) || trans('This format is invalid.')
]

export const telegramTokenRequiredRule = [
    (v: string) => !! v.trim() || trans('This field is required.'),
    (v: string) => /^\d{8,10}:[a-zA-Z\d_-]{35}$/.test(v.trim()) || trans('This format is invalid.')
]

export const timezoneRule = [
    (v: any) => !! v.trim() || trans('This field is required.'),
    (v: any) => timezones().includes(v.trim()) || trans('This must be a valid timezone.')
]

export const rolesRule = [
    (v: number[]) => !! v.length || trans('This field is required.'),
    (v: number[]) => v.length <= settingsStore.roles.count || trans('This field must not be greater than :max.', { max: settingsStore.roles.count.toString() })
]

export const listRule = [
    (v: number[]) => !! v.length || trans('This field is required.')
]

export const textRequired = [
    (v: any) => !! v.trim() || trans('This field is required.'),
    (v: string) => v.trim().length >= 3 || trans('This field must be at least 3 characters.')
]
