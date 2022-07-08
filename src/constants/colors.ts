import { STATUS_CANCELLED, STATUS_DONE, STATUS_IN_PROGRESS, STATUS_NEW } from '@/constants/statuses'

export const defaultColor = 'white'

export const colors = {
    [STATUS_NEW]: 'info',
    [STATUS_IN_PROGRESS]: 'green',
    [STATUS_CANCELLED]: 'pink',
    [STATUS_DONE]: 'grey'
}
