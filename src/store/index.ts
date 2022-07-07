import { defineStore } from 'pinia'

import auth from './auth'
import meta from './meta'
import page from './page'
import user from './user'
import settings from './settings'

export const useAuthStore = defineStore('auth', auth)
export const useMetaStore = defineStore('meta', meta)
export const usePageStore = defineStore('page', page)
export const useUserStore = defineStore('user', user)
export const useSettingsStore = defineStore('settings', settings)
