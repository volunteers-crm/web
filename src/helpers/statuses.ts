import _ from 'lodash'

import { STATUS_CANCELLED, STATUS_DONE, STATUS_IN_PROGRESS, STATUS_NEW } from '@/constants/statuses'
import { colors, defaultColor } from '@/constants/colors'

const titles = {
    [STATUS_NEW]: 'new',
    [STATUS_IN_PROGRESS]: 'in progress',
    [STATUS_CANCELLED]: 'cancelled',
    [STATUS_DONE]: 'done'
}

export const color = (status: number) => _.get(colors, status, defaultColor)

export const title = (status: number) => _.get(titles, status, 'new')
