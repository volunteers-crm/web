import { createApp } from 'vue'
import { i18nVue } from 'laravel-vue-i18n'
import VueApexCharts from 'vue3-apexcharts'

import Toast from 'vue-toastification'
import ToastOptions from '@/plugins/toast'

import routes from '@/routes'
import pinia from '@/plugins/pinia'

import vuetify from '@/plugins/vuetify'
import i18nOptions from '@/plugins/lang'

import { loadFonts } from '@/plugins/webfontloader'

import { telegramLoginTemp } from 'vue3-telegram-login'

import App from '@/pages/app.vue'

loadFonts()

createApp(App)
    .use(pinia)
    .use(routes)
    .use(vuetify)
    .use(Toast, ToastOptions)
    .use(i18nVue, i18nOptions)
    .use(VueApexCharts)
    .component('TelegramLogin', telegramLoginTemp)
    .mount('#app')
