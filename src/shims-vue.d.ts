import 'vue-router'

declare module '*.vue'
{
    import type { DefineComponent } from 'vue'

    const component: DefineComponent<{}, {}, any>

    export default component
}

declare module 'vue-router'
{
    interface RouteMeta
    {
        requiresAuth?: boolean,
        layout?: string,
        title: string,
        icon?: string,
        show?: boolean
    }
}
