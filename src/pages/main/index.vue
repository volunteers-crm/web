<template>
    <div class="d-flex justify-center align-center flex-column fill-height">
        <div class="d-flex justify-center text-center pa-16">
            <h1 class="text-h1">
                volunteers
            </h1>

            <h2 class="text-h4">
                CRM
            </h2>
        </div>

        <div>
            <telegram-sign-in-btn />
        </div>
    </div>
</template>

<script lang="ts" setup>
import TelegramSignInBtn from '@/components/buttons/telegram/sign-in.vue'

import {onMounted} from "vue";

import store from "@/store";

onMounted(() => store.commit('meta/setPageTitle'))
</script>
