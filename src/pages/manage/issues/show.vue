<template>
    <v-loader-page
        :params="params"
        :title="title"
        :url="url"
        no-cache
    >
        Show Issue ID {{ route.params.id }}
    </v-loader-page>

    {{ route }}
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
</script>
