interface Channel
{
    id: number,
    username: string,
    name: string,
    appeals?: {
        open: number,
        closed: number
    },
    bot?: Bot
}
