<template>
    <v-page :title="title">
        content will be here
    </v-page>
</template>

<script lang="ts" setup>
import VPage from '@/components/pages/info.vue'
import {ref} from "vue";

const title = ref('Sign In')
</script>
