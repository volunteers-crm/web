interface Bot
{
    id: number,
    name: string,
    title: string,
    timezone: string,
    locale: string,
    channels?: Channel[] | null,
    roles?: RoleGroupByCategory | Role[] | null
}
