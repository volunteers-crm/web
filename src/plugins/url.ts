import url from 'query-string'

export default new class {
    readonly #query: any

    constructor() {
        this.#query = url.parse(location.search)
    }

    getParam(key: string): any {
        return this.#query[key]
    }

    getParams(): [] {
        return this.#query
    }
}
