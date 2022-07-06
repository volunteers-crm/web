<template>
    <v-loading-page :title="title" :url="url">
        Show Issue ID {{ route.params.id }}
    </v-loading-page>

    {{ route }}
</template>

<script lang="ts" setup>
import VLoadingPage from '@/components/pages/loading.vue'

import {API_ISSUES_SHOW} from "@/constants/api_routes";

import {ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()

const url = ref(API_ISSUES_SHOW.replace(':id', route.params.id))

const title = ref(route.meta.title.replace(':id', route.params.id))
</script>
