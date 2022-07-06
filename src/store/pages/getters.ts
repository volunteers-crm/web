export default {
    hasPage: (state: any) => (url: string) => state.items[url] !== undefined,
    getPage: (state: any) => (url: string) => state.items[url]
}
