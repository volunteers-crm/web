import url from 'query-string'

export default new class {
    readonly #query: any

    constructor() {
        this.#query = url.parse(location.search)
    }

    hasParam(key: string): boolean {
        return this.#query[key] !== undefined
    }

    getParam(key: string): any {
        return this.#query[key]
    }

    getParams(): [] {
        return this.#query
    }
}
