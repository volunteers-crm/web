import {createApp} from 'vue'

import routes from "@/routes";
import store from "@/store";
import vuetify from '@/plugins/vuetify'

import {loadFonts} from './plugins/webfontloader'

import App from '@/pages/app.vue'

loadFonts()

createApp(App)
    .use(store)
    .use(routes)
    .use(vuetify)
    .mount('#app')
