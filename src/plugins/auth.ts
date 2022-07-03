import Storage from "@/plugins/storage";

const key = 'token'

export function setToken(token: string) {
    Storage.set(key, token)
}

export function getToken() {
    return Storage.get(key)
}
