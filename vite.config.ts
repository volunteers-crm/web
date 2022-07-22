import { defineConfig } from 'vite'
import { resolve } from 'path'

import i18n from 'laravel-vue-i18n/dist/vite'
import vuetify from 'vite-plugin-vuetify'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    },
    plugins: [
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false
                }
            }
        }),
        vuetify({
            autoImport: true,
            styles: 'sass'
        }),
        i18n()
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/assets/styles/_variables";`
            }
        }
    }
    // maybe need to ngrok
    // server: {
    //     hmr: {
    //         clientPort: 443
    //     }
    // }
})
