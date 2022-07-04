export default new class Storage {
    has(key: string): boolean {
        return localStorage.getItem(key) !== null
    }

    doesntExist(key: string): boolean {
        return !this.has(key)
    }

    get(key: string): string | null {
        return localStorage.getItem(key)
    }

    set(key: string, value: string): void {
        localStorage.setItem(key, value)
    }

    forget(key: string): void {
        localStorage.removeItem(key)
    }
}
