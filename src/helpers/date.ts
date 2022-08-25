import dayjs from 'dayjs'

export const dateFormat = (date: string) => dayjs(date).format('LLL')

export const dateFormatRows = (date: string) => dayjs(date).format('YYYY-MM-DD[<br>]HH:mm')

export const dateFormatFull = (date: string) => dayjs(date).format('YYYY-MM-DD, HH:mm')

export const dateFormatTime = (date: string) => dayjs(date).format('HH:mm')

export const now = () => dayjs()

export const isToday = (date: string) => dayjs(date).startOf('day').isSame(now().startOf('day'))

export const timezones = () => dayjs.tz.names()
