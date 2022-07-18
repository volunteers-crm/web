const wrap = (needles: string | string[]): string[] => {
    return typeof needles === 'string' ? [needles] : needles
}

export const strEndsWith = (haystack: string, needles: string | string[]): boolean => {
    let result = false

    wrap(needles).forEach((needle: string) => {
        if (haystack.endsWith(needle)) {
            result = true

            return
        }
    })

    return result
}

export const strAfterLast = (haystack: string, needles: string | string[]): string => {
    wrap(needles).forEach((needle: string) => {
        const index = haystack.lastIndexOf(needle)

        if (index !== -1) {
            haystack = haystack.substring(index + 1)

            return
        }
    })

    return haystack
}
