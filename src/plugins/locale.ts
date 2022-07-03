const key = 'locale'
const fallback = 'en'

export function setLocale(locale: string = fallback) {
    localStorage.setItem(key, locale)
}

export function getLocale() {
    return localStorage.getItem(key)
}

export function setFallbackLocale() {
    if (getLocale() === null) {
        setLocale(fallback)
    }
}
