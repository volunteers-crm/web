import { createApp } from 'vue'
import { i18nVue } from 'laravel-vue-i18n'
import VueApexCharts from 'vue3-apexcharts'
import { telegramLoginTemp } from 'vue3-telegram-login'

import Toast from 'vue-toastification'
import ToastOptions from '@/utils/toast'
import vuetify from '@/utils/vuetify'

import routes from '@/routes'

import pinia from '@/utils/pinia'
import { langOptions } from '@/utils/lang'
import { loadFonts } from '@/utils/webfontloader'
import { initAxios } from '@/utils/axios'
import { initDate } from '@/utils/date'
import OpenLayersMap from '@/utils/maps'

import App from '@/app.vue'

loadFonts()
initAxios()
initDate()

createApp(App)
    .use(pinia)
    .use(routes)
    .use(vuetify)
    .use(OpenLayersMap)
    .use(VueApexCharts)
    .use(Toast, ToastOptions)
    .use(i18nVue, langOptions(pinia))
    .component('TelegramLogin', telegramLoginTemp)
    .mount('#app')
