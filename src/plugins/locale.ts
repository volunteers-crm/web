import {APPLICATION_LOCALE} from "@/constants/meta";

export function setLocale() {
    if (localStorage.getItem(APPLICATION_LOCALE) === null) {
        localStorage.setItem(APPLICATION_LOCALE, 'en')
    }
}

export function getLocale() {
    return localStorage.getItem(APPLICATION_LOCALE)
}
