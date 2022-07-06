<template>
    <v-simple-page
        :params="params"
        :title="title"
        :url="url"
    />
</template>

<script lang="ts" setup>
import VSimplePage from '@/components/pages/simple.vue'

import {API_URL_PAGE} from "@/constants/api_routes";

import {ref} from "vue";

const url = ref(API_URL_PAGE)

const params = ref({slug: 'about'})

const title = ref('About Us')
</script>
