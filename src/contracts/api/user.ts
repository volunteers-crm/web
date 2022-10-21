interface User
{
    id: number | null,
    username: string | null,
    name: string | null,
    avatar: string | null,
    volunteer?: Volunteer | null
}
