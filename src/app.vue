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

import { LAYOUT_ADMIN, LAYOUT_DEFAULT } from '@/constants/layouts'

import { user } from '@/_fakes/user'
import { useUserStore } from '@/stores/user'

const layout = computed(() => {
    const { meta } = useRoute()

    const template = meta?.layout || LAYOUT_DEFAULT

    return template === LAYOUT_ADMIN
        ? defineAsyncComponent(() => import('@/layouts/admin.vue'))
        : defineAsyncComponent(() => import('@/layouts/default.vue'))
})

// TODO: Push fake user data
onBeforeMount(() => {
    useUserStore().setToken('Bearer qwerty12345')
    useUserStore().setUser(user)
})
</script>
