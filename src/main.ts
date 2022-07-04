import {createApp} from 'vue'
import {i18nVue} from 'laravel-vue-i18n'
import VueApexCharts from "vue3-apexcharts";

import Toast from "vue-toastification";
import ToastOptions from '@/plugins/toast'

import routes from "@/routes";
import store from "@/store";
import vuetify from '@/plugins/vuetify'
import i18nOptions from '@/plugins/lang'

import {loadFonts} from '@/plugins/webfontloader'
import {setFallbackLocale} from "@/plugins/locale";
import {loadMenuToggle} from "@/plugins/menu";

import {telegramLoginTemp} from 'vue3-telegram-login'

import App from '@/pages/app.vue'

loadFonts()
loadMenuToggle()
setFallbackLocale()

createApp(App)
    .use(store)
    .use(routes)
    .use(vuetify)
    .use(Toast, ToastOptions)
    .use(i18nVue, i18nOptions)
    .use(VueApexCharts)
    .component('TelegramLogin', telegramLoginTemp)
    .mount('#app')
