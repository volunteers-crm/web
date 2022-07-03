import {createApp} from 'vue'
import {i18nVue} from 'laravel-vue-i18n'

import Toast from "vue-toastification";
import ToastOptions from '@/plugins/toast'

import routes from "@/routes";
import store from "@/store";
import vuetify from '@/plugins/vuetify'
import i18nOptions from '@/plugins/lang'

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
    .use(i18nVue, i18nOptions)
    .mount('#app')
