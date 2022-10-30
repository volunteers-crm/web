import dayjs from 'dayjs'

const parse = (date: any, timezone?: string) => dayjs(date).tz(timezone)

export const now = (timezone?: string) => parse(null, timezone)

export const dateFormat = (date: string, timezone?: string) => parse(date, timezone).format('YYYY-MM-DD, HH:mm')

export const dateFormatRows = (date: string, timezone?: string) => parse(date, timezone).format('YYYY-MM-DD[<br>]HH:mm')

export const dateFormatFull = (date: string, timezone?: string) => parse(date, timezone).format('YYYY-MM-DD, HH:mm')

export const dateFormatFullWithTz = (date: string, timezone?: string) => parse(date, timezone).format('YYYY-MM-DD, HH:mm[<br>]Z')

export const dateCustomFormat = (date: string, format: string, timezone?: string) => parse(date, timezone).format(format)

export const dateFormatTime = (date: string, timezone?: string) => parse(date, timezone).format('HH:mm')

export const isToday = (date: string, timezone?: string) => parse(date, timezone).startOf('day').isSame(now().startOf('day'))

export const timezones = () => [dayjs.tz.guess()]
