import {Route} from '@/models/route'
import {collect} from "@/models/collection";

import userRoutes from '@/routes/routes/user'
import manageRoutes from '@/routes/routes/manage'
import Storage from "@/plugins/storage";
import store from '@/store'

export const users = collect(userRoutes)
    .filter((route: any): boolean => route?.meta?.show && route?.meta?.title)
    .map((route: any): Route => new Route(route.name, route.meta.title))
    .get()

export const manages = collect(manageRoutes[0]?.children || [])
    .get()

export function loadMenuToggle(): void {
    const value = Storage.get('navigation_rail') === 'true'

    store.commit('meta/menuRailToggle', value)
}

export function saveMenuToggle(): void {
    const value = store.getters['meta/getMenuRail']

    Storage.set('navigation_rail', value)
}
