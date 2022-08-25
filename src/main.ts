import { createApp } from 'vue'
import vuetify from '@/utils/vuetify'
import { i18nVue } from 'laravel-vue-i18n'
import VueApexCharts from 'vue3-apexcharts'
import { telegramLoginTemp } from 'vue3-telegram-login'

import Toast from 'vue-toastification'
import ToastOptions from '@/utils/toast'

import routes from '@/routes'

import pinia from '@/utils/pinia'
import i18nOptions from '@/utils/lang'
import { loadFonts } from '@/utils/webfontloader'
import { initAxios } from '@/utils/axios'
import { initDate } from '@/utils/date'
import OpenLayersMap from '@/utils/maps'

import App from '@/app.vue'

loadFonts()
initAxios(pinia)
initDate(pinia)

createApp(App)
    .use(pinia)
    .use(routes)
    .use(vuetify)
    .use(OpenLayersMap)
    .use(VueApexCharts)
    .use(Toast, ToastOptions)
    .use(i18nVue, i18nOptions(pinia))
    .component('TelegramLogin', telegramLoginTemp)
    .mount('#app')
