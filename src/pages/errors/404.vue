<template>
    <v-error-page :title="title" go-back go-main />
</template>

<script lang="ts" setup>
import VErrorPage from '@/components/pages/error.vue'

import { ref } from 'vue'

const title = ref('Page Not Found')
</script>
