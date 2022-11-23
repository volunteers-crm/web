interface AudioMessageType
{
    text: string | null,

    performer: string | null,
    title: string | null,

    duration: string,

    filename: string,
    mime_type: string,

    url: string
}
