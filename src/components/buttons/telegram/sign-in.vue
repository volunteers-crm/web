<template>
    <telegram-login
        :redirect-url="redirectUrl"
        :telegram-login="username"
        mode="redirect"
    />
</template>

<script lang="ts" setup>
import {ref} from "vue";

const redirectUrl = ref(import.meta.env.VITE_TELERAM_API_CONFIRM)

const username = ref(import.meta.env.VITE_TELEGRAM_BOT)
</script>
