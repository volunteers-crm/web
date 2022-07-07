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

import { API_ISSUES_SHOW } from '@/constants/api_routes'

import { findIssue } from '@/fakes/issues'

import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const { meta, params } = useRoute()

const url = ref(API_ISSUES_SHOW)

const title = ref(meta.title)

const fake = computed(() => findIssue(params.id))
</script>
