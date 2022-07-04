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

import {computed} from "vue";

import url from '@/plugins/url'

const isRegister = computed(() => url.hasParam('id'))
</script>
