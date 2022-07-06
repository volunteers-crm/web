import {APPLICATION_TITLE} from "@/constants/meta";

import Storage from "@/plugins/storage";
import store from "@/store";

import {trans} from "laravel-vue-i18n";

const key = 'locale'
const fallback = 'en'

export function setLocale(locale: string, reload: boolean = false) {
    Storage.set(key, locale)

    if (reload) {
        window.location.reload()
    }
}

export function getLocale(): string {
    return Storage.get(key) ?? fallback
}

export function setFallbackLocale(): void {
    if (Storage.doesntExist(key)) {
        Storage.set(key, fallback)
    }
}

export function setPageTitle(route: any, title: string): void {
    title = trans(title, route?.params || {})

    document.title = title

    if (document.title !== APPLICATION_TITLE) {
        document.title += ` - ${APPLICATION_TITLE}`
    }
console.log('set page title', title)
    store.commit('meta/setPageTitle', title)
}
