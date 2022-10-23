import axios from 'axios'
import _ from 'lodash'

import { useToast } from 'vue-toastification'
import { trans } from 'laravel-vue-i18n'

import { useSettingsStore } from '@/stores/settings'
import { useUserStore } from '@/stores/user'

const toast = useToast()

axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
    const settingsStore = useSettingsStore()
    const userStore = useUserStore()

    config.headers['X-Locale'] = settingsStore.locale || 'en'

    if (!! userStore.token) {
        config.headers.Authorization = userStore.token
    }

    return config
})

axios.interceptors.response.use(
    response => {
        switch (response?.config?.method) {
            case 'post':
                toast.success(trans('Successfully created.'))
                break

            case 'put':
                toast.success(trans('Successfully updated.'))
                break

            case 'delete':
                toast.success(trans('Successfully deleted.'))
                break
        }

        return response.data
    },
    error => {
        switch (error?.status || error?.response?.status) {
            case 422:
                const messages = error?.response?.data?.errors || [error?.response?.data?.message] || []

                let errors: string[] = []

                _.each(messages, message => {
                    errors.push(message.join('<br>'))
                })

                toast.error(errors.join('<br>'))
                break

            case 404:
                toast.error(trans('Not Found'))
                break

            case 401:
                useUserStore().logout()

            default:
                toast.error(trans(error?.response?.data?.message || error?.data?.message || 'Whoops! Something went wrong.'))
        }

        throw error
    }
)

export const initAxios = () => axios
