interface Role
{
    id: number,
    title: string,
    is_storage: boolean
}

interface RoleGroupByCategory
{
    [index: string]: Role[]
}

interface RoleListItem
{
    id?: number,
    title: string,
    is_storage: boolean
}
