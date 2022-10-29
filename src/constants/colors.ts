import { STATUS_CANCELLED, STATUS_DONE, STATUS_IN_PROGRESS, STATUS_NEW } from '@/constants/statuses'

export const defaultColor = 'white'

export const colors = {
    [STATUS_NEW]: 'orange',
    [STATUS_IN_PROGRESS]: 'blue',
    [STATUS_CANCELLED]: 'pink',
    [STATUS_DONE]: 'green'
}
