<template>
    <telegram-login
        :redirect-url="redirectUrl"
        :telegram-login="username"
        mode="redirect"
    />
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {ROUTE_SIGN_IN} from "@/routes/names";

const router = useRouter()

const host = window.location.origin
const path = router.resolve({name: ROUTE_SIGN_IN}).fullPath

const redirectUrl = host + path

const username = ref(import.meta.env.VITE_TELEGRAM_BOT)
</script>
