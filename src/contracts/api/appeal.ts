interface Appeal
{
    id: number,
    bot: Bot,
    client: User,
    curator: User | null,
    status: string,
    is_published: boolean,
    published_at: string,
    created_at: string,
    updated_at: string,
}
