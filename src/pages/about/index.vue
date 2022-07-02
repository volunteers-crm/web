<template>
    <v-page :title="title">
        {{ content }}
    </v-page>
</template>

<script setup lang="ts">
import VPage from '@/components/pages/basic.vue'
import {ref} from "vue";

const title = ref('About Us')

const content = ref('Coming soon...')
</script>
