interface Bot
{
    id: number,
    username: string,
    name: string,
    timezone: string,
    locale: string,
    channels?: Channel[],
}

interface Channel
{
    id: number,
    username: string,
    name: string,
    appeals?: ChannelAppeals,
    bot?: Bot
}

interface ChannelAppeals
{
    open: number,
    closed: number
}

interface User
{
    id: number,
    username: string | null,
    name: string,
    avatar: string
}

interface Appeal
{
    id: number,
    bot: Bot,
    client: User,
    curator: User | null,
    source: string,
    status: string,
    created_at: string,
    updated_at: string,
}

interface Message
{
    id: number,
    sender: User,
    content: string,
    type: string,
    created_at: string,
    updated_at: string,
}

interface FakeMessages
{
    [index: number]: Message[]
}
