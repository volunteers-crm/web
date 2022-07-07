export interface User
{
    id: number | null,
    username: string | null,
    name: string | null,
    avatar: string | null
}

export interface UserStore
{
    isLogged: boolean,

    user: User
}
