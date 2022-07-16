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
