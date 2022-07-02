<template>
    <v-container>
        <h1 class="text-h4 mb-4" v-text="title" />

        <v-layout>
            <slot />
        </v-layout>
    </v-container>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

defineProps<{
    title: string
}>()
</script>
