interface Appeal
{
    id: number,
    bot: Bot,
    client: User,
    curator: User | null,
    status: string,
    created_at: string,
    updated_at: string,
}
