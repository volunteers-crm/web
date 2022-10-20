import axios from 'axios'
import _ from 'lodash'

import { useToast } from 'vue-toastification'
import { trans } from 'laravel-vue-i18n'
import { createPinia } from 'pinia'

import { useSettingsStore } from '@/stores/settings'
import { useAuthStore } from '@/stores/auth'

const pinia = createPinia()

const toast = useToast()
const settingsStore = useSettingsStore(pinia)
const authStore = useAuthStore(pinia)

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['X-Locale'] = settingsStore.locale

if (authStore.token !== undefined) {
    axios.defaults.headers.common['Authorization'] = authStore.token
}

axios.defaults.baseURL = import.meta.env.VITE_API_URL

axios.interceptors.response.use(
    response => response.data,
    error => {
        switch (error?.status) {
            case 422:
                let errors: string[] = []

                _.each(error?.data?.data, messages => {
                    errors.push(messages.join('<br>'))
                })

                toast.error(errors.join('<br>'))
                break

            default:
                toast.error(trans(error?.data?.message || 'Whoops! Something went wrong.'))
        }

        throw error
    }
)

export const initAxios = () => axios
