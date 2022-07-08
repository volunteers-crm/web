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

import fakeUser from '@/_fakes/user'
import { useAuthStore } from '@/stores/auth'
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
    useAuthStore().set('Bearer qwerty12345')
    useUserStore().set(fakeUser)
})
</script>
