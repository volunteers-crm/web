interface RoleCategory
{
    id: number,
    title: string,
    can_storage: boolean
}

interface Role
{
    id: number,
    title: string,
    is_storage: boolean,
    category: RoleCategory
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
