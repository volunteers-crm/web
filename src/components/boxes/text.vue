<template>
    <div class="grid grid-cols-1 gap-4 place-content-center h-48 text-center">
        <h1
            v-text="header"
            class="text-7xl"
        />

        <h2
            v-if="subheader.length"
            v-text="subheader"
            class="text-2xl"
        />
    </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

defineProps<{
    header: string,
    subheader?: string
}>()
</script>
