<template>
    <v-page :title="title">
        <div>
            <div class="mb-4">
                <v-avatar :image="avatar" :size="256" />
            </div>

            <h1 class="font-weight-light text-h4">
                {{ firstName }} {{ lastName }}
            </h1>

            <v-progress-linear
                v-if="isLoading"
                class="mt-6"
                color="primary"
                height="6"
                indeterminate
                rounded
            />

            <div v-if="hasError">
                Whoops!
            </div>
        </div>
    </v-page>
</template>

<script lang="ts" setup>
import VPage from '@/components/pages/info.vue'

import {API_URL_AUTH} from "@/constants/api_routes";
import {ROUTE_ADMIN_DASHBOARD} from "@/routes/names";

import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";

import url from '@/plugins/url'
import api from '@/plugins/axios'

import {setToken} from "@/plugins/auth";

const router = useRouter()

const title = 'Sign In'

const firstName = ref(url.getParam('first_name'))
const lastName = ref(url.getParam('last_name'))
const avatar = ref(url.getParam('photo_url'))

let loading = true
let loadingError = false

const isLoading = computed(() => loading)
const hasError = computed(() => loadingError)

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
            loadingError = true
        })
        .finally(() => loading = false)
})
</script>
