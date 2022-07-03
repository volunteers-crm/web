<template>
    <v-page :slug="slug" />
</template>

<script lang="ts" setup>
import VPage from '@/components/pages/default.vue'

import {ref} from "vue";

const slug = ref('about')
</script>
