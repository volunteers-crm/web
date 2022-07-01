import {createApp} from 'vue'

import routes from "./routes";
import store from "./store";

import App from './App.vue'

createApp(App)
    .use(routes)
    .use(store)
    .mount('#app')
