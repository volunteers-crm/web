import axios from 'axios'

export const downloadFile = (url: string, onFailed: any, onFinish: any) => {
    axios({
        url,
        method: 'GET',
        responseType: 'blob'
    })
        .then((response: any) => {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')

            const filename = response?.headers?.['content-disposition']?.split('=')[1]

            link.href = url
            link.setAttribute('download', filename)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        })
        .catch(onFailed)
        .finally(onFinish)
}
