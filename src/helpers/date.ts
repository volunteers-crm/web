import moment from 'moment'

export const dateFormat = (date: string) => moment(date).format('LLL')

export const dateFormatRows = (date: string) => moment(date).format('YYYY-MM-DD[<br>]HH:mm')

export const dateFormatFull = (date: string) => moment(date).format('YYYY-MM-DD, HH:mm')

export const dateFormatTime = (date: string) => moment(date).format('HH:mm')

export const isToday = (date: string) => moment(date).isSame(new Date(), 'day')
