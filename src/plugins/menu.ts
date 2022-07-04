import {Route} from '@/models/route'
import {collect} from "@/models/collection";

import userRoutes from '@/routes/routes/user'
import manageRoutes from '@/routes/routes/manage'

export const users = collect(userRoutes)
    .filter((route: any): boolean => route?.meta?.show && route?.meta?.title)
    .map((route: any): Route => new Route(route.name, route.meta.title))
    .get()

export const manages = collect(manageRoutes[0]?.children || [])
    .get()
