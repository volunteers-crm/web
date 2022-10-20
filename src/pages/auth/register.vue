<template>
    <v-page title="Sign In">
        <div class="w-100">
            <div class="mb-4">
                <v-avatar :image="avatar" size="256" />
            </div>

            <h1 class="font-weight-light text-h4 text-no-wrap">
                {{ $t('Hello') }}, {{ firstName.trim() || 'guest' }}!
            </h1>

            <div v-if="loading">
                <v-progress-linear
                    class="mt-6"
                    color="primary"
                    height="6"
                    indeterminate
                    rounded
                />

                <div v-text="$t('Please wait, authorization in progress...')" />
            </div>

            <div v-if="errorMessage" class="mt-4 align-center">
                <v-alert class="text-left" type="error">
                    {{ $t(errorMessage) }}
                </v-alert>

                <telegram-sign-in-btn class="mt-4" />
            </div>
        </div>
    </v-page>
</template>

<script lang="ts" setup>
import VPage from '@/components/pages/info.vue'
import TelegramSignInBtn from '@/components/buttons/telegram/sign-in.vue'

import { API_URL_AUTH } from '@/constants/api_routes'
import { ROUTE_ADMIN_DASHBOARD } from '@/routes/names'

import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import url from '@/helpers/url'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()

const firstName = ref(url.getParam('first_name'))
const avatar = ref(url.getParam('photo_url'))

const loading = ref(true)
const errorMessage = ref()

onMounted(() => {
    axios
        .post(API_URL_AUTH, url.getParams())
        .then((response: any) => {
            authStore.setToken(response.data.token)
            userStore.set(response.data.user)

            router.push({ name: ROUTE_ADMIN_DASHBOARD })
        })
        .catch((error: any) => {
            errorMessage.value = error?.response?.data?.message || error?.message
        })
        .finally(() => loading.value = false)
})
</script>
