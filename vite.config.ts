import {defineConfig} from 'vite'
import {resolve} from 'path'

import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
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
        })
    ],
    server: {
        hmr: {
            clientPort: 443
        }
    }
})
