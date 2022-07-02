<template>
    <v-page :title="title">
        {{ content }}
    </v-page>
</template>

<script lang="ts" setup>
import VPage from '@/components/pages/basic.vue'

import {API_URL_PAGE} from "@/constants/api_routes";

import {onMounted, ref} from "vue";

import api from '@/plugins/axios'

const title = ref('...')

const content = ref('Loading...')

onMounted(() => {
    api
        .get(API_URL_PAGE.replace(':page', 'about'))
        .then((response: any) => console.log('SUCCESS', response))
})
</script>
