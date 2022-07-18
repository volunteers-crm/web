interface Volunteer
{
    id: number,
    name: string,
    city: City,
    about: string,
    source: string,
    socials: string[],
    recommendations: string[],
    roles: Role[],
    is_coordinator: boolean
}
