<template>
    <v-page title="Sign In">
        <v-register v-if="isRegister" />

        <telegram-sign-in-btn v-else />
    </v-page>
</template>

<script lang="ts" setup>
import VPage from '@/components/pages/info.vue'
import VRegister from '@/pages/auth/register.vue'
import TelegramSignInBtn from '@/components/buttons/telegram/sign-in.vue'

import {ROUTE_ADMIN_DASHBOARD} from "@/routes/names";

import {computed, onBeforeMount} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import url from '@/plugins/url'

const store = useStore()
const router = useRouter()

const isRegister = computed(() => url.hasParam('id'))

onBeforeMount(() => {
    if (store.getters['user/isLogged']) {
        router.push({name: ROUTE_ADMIN_DASHBOARD})
    }
})
</script>
