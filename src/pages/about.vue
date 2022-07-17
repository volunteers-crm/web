<template>
    <v-simple-page
        :fake="fake"
        :params="params"
        :title="title"
        :url="url"
    />
</template>

<script lang="ts" setup>
import VSimplePage from '@/components/pages/simple.vue'

import { API_URL_PAGE } from '@/constants/api_routes'

import { about } from '@/_fakes/pages'

import { ref } from 'vue'

const url = ref(API_URL_PAGE)

const params = ref({ slug: 'about' })

const title = ref('About Us')

const fake = ref(about)
</script>
