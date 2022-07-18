import { strAfterLast } from '@/helpers/str'

export const cleanTelegramUsername = (username: string): string => {
    return strAfterLast(username, ['@', '/'])
}
