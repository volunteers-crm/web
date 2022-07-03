import {createApp} from 'vue'

import Toast from "vue-toastification";
import ToastOptions from '@/plugins/toast'

import routes from "@/routes";
import store from "@/store";
import vuetify from '@/plugins/vuetify'

import {loadFonts} from '@/plugins/webfontloader'
import {setFallbackLocale} from "@/plugins/locale";

import App from '@/pages/app.vue'

loadFonts()
setFallbackLocale()

createApp(App)
    .use(store)
    .use(routes)
    .use(vuetify)
    .use(Toast, ToastOptions)
    .mount('#app')
