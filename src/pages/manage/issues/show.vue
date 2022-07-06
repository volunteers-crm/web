<template>
    <v-loader-page
        :fake="fake"
        :params="params"
        :title="title"
        :url="url"
        no-cache
    >
        Show Issue ID
    </v-loader-page>

    {{ route || 'aaa' }}
</template>

<script lang="ts" setup>
import VLoaderPage from '@/components/pages/loader.vue'

import {API_ISSUES_SHOW} from "@/constants/api_routes";

import {ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()

const url = ref(API_ISSUES_SHOW)

const params = ref(route.params)

const title = ref(route.meta.title)

const fake = ref({
    a: 'A'
})
</script>
