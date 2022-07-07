import 'vue-router'

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
