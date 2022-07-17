interface Message
{
    id: number,
    sender: User,
    content: string
        | AudioMessageType
        | ContactMessageType
        | DocumentMessageType
        | LocationMessageType
        | MediaMessageType,
    type: string,
    created_at: string,
    updated_at: string,
}
