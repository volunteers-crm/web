export default {
    hasPage: (state: any) => (slug: string) => state.items[slug] !== undefined,
    getPage: (state: any) => (slug: string) => state.items[slug]
}
