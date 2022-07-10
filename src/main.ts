import pinia from '@/utils/pinia'

import { createApp } from 'vue'
import { i18nVue } from 'laravel-vue-i18n'
import VueApexCharts from 'vue3-apexcharts'
import Maska from 'maska'

import Toast from 'vue-toastification'
import ToastOptions from '@/utils/toast'

import routes from '@/routes'

import vuetify from '@/utils/vuetify'
import i18nOptions from '@/utils/lang'
import { loadFonts } from '@/utils/webfontloader'
import { initAxios } from '@/utils/axios'

import { telegramLoginTemp } from 'vue3-telegram-login'

import App from '@/app.vue'

loadFonts()
initAxios()

createApp(App)
    .use(pinia)
    .use(routes)
    .use(vuetify)
    .use(Maska)
    .use(Toast, ToastOptions)
    .use(i18nVue, i18nOptions(pinia))
    .use(VueApexCharts)
    .component('TelegramLogin', telegramLoginTemp)
    .mount('#app')
