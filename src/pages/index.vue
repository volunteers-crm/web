<template>
    <div class="d-flex justify-center align-center flex-column fill-height">
        <div class="d-flex justify-center text-center pa-16">
            <h1 class="text-h1 text-lowercase">
                {{ header }}
            </h1>

            <h2 class="text-h4 text-lowercase">
                {{ subheader }}
            </h2>
        </div>

        <div>
            <telegram-sign-in-btn />
        </div>
    </div>
</template>

<script lang="ts" setup>
import TelegramSignInBtn from '@/components/buttons/telegram/sign-in.vue'

import { APPLICATION_TITLE } from '@/constants/meta'

import { computed } from 'vue'

const header = computed(() => APPLICATION_TITLE.split(' ')[0])
const subheader = computed(() => APPLICATION_TITLE.split(' ')[1])
</script>
