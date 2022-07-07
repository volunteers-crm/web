import axios from 'axios'
import _ from 'lodash'

import { useToast } from 'vue-toastification'
import { trans } from 'laravel-vue-i18n'
import { useAuthStore, useSettingsStore } from '@/store'

const toast = useToast()
const settingsStore = useSettingsStore()
const authStore = useAuthStore()

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['X-Localization'] = settingsStore.locale
axios.defaults.headers.common['X-Authorization'] = authStore.token || 'undefined'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

axios.interceptors.response.use(
    response => response,
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

export default axios
