import _ from 'lodash'

export class Collection {
    #items: any

    constructor(items: any) {
        this.#items = items
    }

    filter(callback: any) {
        return new Collection(_.filter(this.#items, callback))
    }

    map(callback: any) {
        return new Collection(_.map(this.#items, callback))
    }

    get() {
        return this.#items
    }
}

export function collect(items: any) {
    return new Collection(items)
}
