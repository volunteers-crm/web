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

            <div v-if="errorMessage" class="mt-4">
                <v-alert class="text-left text-no-wrap" type="error">
                    {{ $t(errorMessage) }}
                </v-alert>
            </div>
        </div>
    </v-page>
</template>

<script lang="ts" setup>
import VPage from '@/components/pages/info.vue'

import {API_URL_AUTH} from "@/constants/api_routes";
import {ROUTE_ADMIN_DASHBOARD} from "@/routes/names";

import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

import url from '@/plugins/url'
import api from '@/plugins/axios'

import {setToken} from "@/plugins/auth";

const router = useRouter()

const firstName = ref(url.getParam('first_name'))
const avatar = ref(url.getParam('photo_url'))

const loading = ref(true)
const errorMessage = ref()

onMounted(() => {
    api
        .get(API_URL_AUTH, {
            params: url.getParams()
        })
        .then((response: any) => {
            setToken(response?.data?.token)

            router.push({
                name: ROUTE_ADMIN_DASHBOARD
            })
        })
        .catch((error: any) => {
            errorMessage.value = error?.message
        })
        .finally(() => loading.value = false)
})
</script>
