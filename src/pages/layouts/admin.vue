<template>
    <h1>Admin Layout</h1>

    <slot />

    <v-footer />
</template>

<script setup lang="ts">
import {defineAsyncComponent} from "vue";

const VFooter = defineAsyncComponent(() => import('@/components/skeleton/footer.vue'))
</script>
