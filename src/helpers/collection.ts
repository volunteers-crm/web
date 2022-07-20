import _ from 'lodash'

export class Collection
{
    private readonly items: any

    constructor(items: any)
    {
        this.items = items
    }

    filter(callback: any): Collection
    {
        return new Collection(_.filter(this.items, callback))
    }

    map(callback: any): Collection
    {
        return new Collection(_.map(this.items, callback))
    }

    pluck(key: string): Collection
    {
        return this.map((item: any) => _.get(item, key))
    }

    find(callback: any): any
    {
        return _.find(this.items, callback)
    }

    get(): any
    {
        return this.items
    }

    getFromGrouped(): any
    {
        let list: object[] = []

        _.forEach(this.get(), (items: any, header: any) => {
            list.push({ header })
            list.push(...items)
        })

        return list
    }
}

export function collect(items: any)
{
    return new Collection(items)
}
