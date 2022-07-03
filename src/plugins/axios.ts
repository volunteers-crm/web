import axios from "axios";
import _ from "lodash";

import {getLocale} from "@/plugins/locale";
import {getToken} from '@/plugins/auth'

import {useToast} from "vue-toastification";
import {trans} from "laravel-vue-i18n";

const toast = useToast()

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-Localization'] = getLocale()
axios.defaults.headers.common['X-Authorization'] = getToken()

axios.defaults.baseURL = import.meta.env.VITE_API_URL

axios.interceptors.response.use(
    response => response,
    error => {
        if (error?.status === 422) {
            let errors: string[] = [];

            _.each(error?.data?.data, messages => {
                errors.push(messages.join('<br>'))
            })

            toast.error(errors.join('<br>'))

            return
        }

        toast.error(trans(error?.data?.message || 'Whoops! Something wrong!'))

        throw error
    }
)

export default axios
