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
    response => response.data?.data || response.data,
    error => {
        switch (error?.status || error?.response?.status) {
            case 422:
                let errors: string[] = []

                _.each(error?.data?.data, messages => {
                    errors.push(messages.join('<br>'))
                })

                toast.error(errors.join('<br>'))
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
