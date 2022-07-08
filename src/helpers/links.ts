export const telegram = (username: string | number, title: string | null = null) => {
    title = title ?? username.toString()

    return Number.isNaN(username)
        ? `<a href="tg://user?id=${ username }" target="_blank">${ title }</a>`
        : `<a href="https://t.me/${ username }" target="_blank">@${ title }</a>`
}
