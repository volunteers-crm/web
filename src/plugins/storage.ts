export default new class Storage {
    has(key: string): boolean {
        return localStorage.getItem(key) !== null
    }

    doesntExist(key: string) {
        return !this.has(key)
    }

    get(key: string): string | null {
        return localStorage.getItem(key)
    }

    set(key: string, value: string) {
        localStorage.setItem(key, value)
    }
}
