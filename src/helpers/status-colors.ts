import {STATUS_CANCELLED, STATUS_IN_PROGRESS, STATUS_NEW} from "@/constants/statuses";

import _ from "lodash";

export const colors = {
    [STATUS_NEW]: 'info',
    [STATUS_IN_PROGRESS]: 'green',
    [STATUS_CANCELLED]: 'pink',
}

export const color = (status: string) => {
    return _.get(colors, status)
}
