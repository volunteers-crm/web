export const telegram = (username: string | number, title: string | null = null) => {
    title = title ?? username.toString()

    return `<a href="https://t.me/${username}" target="_blank">@${title}</a>`
}
