import Storage from "@/plugins/storage";

const key = 'token'

export function setToken(token: string) {
    Storage.set(key, token)
}

export function getToken(): string {
    return Storage.get(key) ?? 'undefined'
}

export function hasToken(): boolean {
    return getToken() !== null
}

export function forgetToken(): void {
    Storage.forget(key)
}
