import Storage from "@/plugins/storage";

const key = 'locale'
const fallback = 'en'

export function setLocale(locale: string) {
    Storage.set(key, locale)
}

export function getLocale() {
    return Storage.get(key)
}

export function setFallbackLocale() {
    if (Storage.doesntExist(key)) {
        Storage.set(key, fallback)
    }
}
