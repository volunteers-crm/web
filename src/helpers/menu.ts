import { Route } from '@/models/route'
import { collect } from '@/helpers/collection'

import userRoutes from '@/routes/routes/user'
import manageRoutes from '@/routes/routes/admin'

export const users = collect(userRoutes)
    .filter((route: any): boolean => route?.meta?.show && route?.meta?.title)
    .map((route: any): Route => new Route(route.name, route.meta.title))
    .get()

export const manages = collect(manageRoutes[0]?.children || [])
    .get()
