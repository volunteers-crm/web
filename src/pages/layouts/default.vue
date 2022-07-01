<template>
    <div class="container mx-auto">
        <h1>Default Layout</h1>

        <slot />

        <v-footer />
    </div>
</template>

<script setup lang="ts">
import {defineAsyncComponent} from "vue";

const VFooter = defineAsyncComponent(() => import('@/components/skeleton/footer.vue'))
</script>
