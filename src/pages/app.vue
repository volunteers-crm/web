<template>
    <div class="container">
        <component :is="layout">
            <router-view />
        </component>
    </div>
</template>

<script setup lang="ts">
import {computed, defineAsyncComponent} from "vue";
import {useRoute} from "vue-router";

import {LAYOUT_DEFAULT} from "@/constants/layouts";

const layout = computed(() => {
    const {meta} = useRoute()

    const template = meta?.layout ?? LAYOUT_DEFAULT

    return defineAsyncComponent(() => import(`./layouts/${template}.vue`))
})
</script>
