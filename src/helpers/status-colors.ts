import { STATUS_CANCELLED, STATUS_DONE, STATUS_IN_PROGRESS, STATUS_NEW } from '@/constants/statuses'

import _ from 'lodash'

export const colors = {
    [STATUS_NEW]: 'info',
    [STATUS_IN_PROGRESS]: 'green',
    [STATUS_CANCELLED]: 'pink',
    [STATUS_DONE]: 'grey'
}

export const color = (status: string) => {
    return _.get(colors, status)
}
