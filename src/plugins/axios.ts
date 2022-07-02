import axios from "axios";
import _ from "lodash";

import {useToast} from "vue-toastification";

const toast = useToast()

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers.common['X-Localization'] = store.getters['meta/getLocale']

axios.defaults.baseURL = import.meta.env.VITE_API_URL

axios.interceptors.response.use(
    response => response,
    error => {
        console.log(error)

        if (error?.status === 422) {
            let errors: string[] = [];

            _.each(error?.data?.data, messages => {
                errors.push(messages.join('<br>'))
            })

            toast.error(errors.join('<br>'))

            return
        }

        toast.error(error?.data?.message || 'Whoops! Something wrong!')

        throw error
    }
)

export default axios
