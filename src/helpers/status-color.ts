import _ from 'lodash'

import { colors, defaultColor } from '@/constants/colors'

export const color = (status: string) => _.get(colors, status, defaultColor)
