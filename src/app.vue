<template>
    <v-app>
        <component :is="layout">
            <router-view />
        </component>
    </v-app>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import { LAYOUT_ADMIN, LAYOUT_DEFAULT } from '@/constants/layouts'
import { API_AUTH_ME } from '@/constants/api_routes'

import { useUserStore } from '@/stores/user'

const layout = computed(() => {
    const { meta } = useRoute()

    const template = meta?.layout || LAYOUT_DEFAULT

    return template === LAYOUT_ADMIN
        ? defineAsyncComponent(() => import('@/layouts/admin.vue'))
        : defineAsyncComponent(() => import('@/layouts/default.vue'))
})

onBeforeMount(() => {
    const userStore = useUserStore()

    if (! userStore.hasLogged && !! userStore.token) {
        axios
            .get(API_AUTH_ME)
            .then(response => userStore.setUser(response.data))
    }
})
</script>
