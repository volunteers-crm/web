import {createApp} from 'vue'

import routes from "@/routes";
import store from "@/store";

import App from '@/pages/app.vue'

createApp(App)
    .use(store)
    .use(routes)
    .mount('#app')
