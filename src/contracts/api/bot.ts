interface Bot
{
    id: number,
    username: string,
    name: string,
    timezone: string,
    locale: string,
    channels?: Channel[] | null,
}
