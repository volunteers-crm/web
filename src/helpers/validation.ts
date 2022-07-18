import { strEndsWith } from '@/helpers/str'

export const hasValidTelegramUsername = (username?: string | null): boolean => {
    username = (username || '').trim()

    if (! username || username.length < 4) {
        return false
    }

    return strEndsWith(username, ['_bot', 'Bot'])
}
