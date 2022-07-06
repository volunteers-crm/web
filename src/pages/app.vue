<template>
    <v-app>
        <component :is="layout">
            <router-view />
        </component>
    </v-app>
</template>

<script lang="ts" setup>
import {computed, defineAsyncComponent, onBeforeMount} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

import {LAYOUT_ADMIN, LAYOUT_DEFAULT} from "@/constants/layouts";

import {setToken} from "@/plugins/auth";

const store = useStore()

const layout = computed(() => {
    const {meta} = useRoute()

    const template = meta?.layout ?? LAYOUT_DEFAULT

    return template === LAYOUT_ADMIN
        ? defineAsyncComponent(() => import('@/pages/layouts/admin.vue'))
        : defineAsyncComponent(() => import('@/pages/layouts/default.vue'))
})

// TODO: Push fake user data
onBeforeMount(() => {
    setToken('Bearer qwerty12345')

    store.commit('user/setUser', {
        id: 1,
        name: 'Sandra Adams',
        username: '@sandra_adams',
        avatar: 'https://randomuser.me/api/portraits/women/85.jpg'
    })
})
</script>
