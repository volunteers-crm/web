<template>
    <v-page :title="title" go-back />
</template>

<script lang="ts" setup>
import VPage from '@/components/pages/error.vue'

import {ref} from "vue";

const title = ref('Page Not Found')
</script>
