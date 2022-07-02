import _ from 'lodash'

import routes from '@/routes/routes'
import {Route} from '@/models/route'

const filtered = _.filter(routes, (route: any): boolean => route?.meta?.show && route?.meta?.title)
const mapped = _.map(filtered, (route: any): Route => new Route(route.name, route.meta.title))

export default mapped
