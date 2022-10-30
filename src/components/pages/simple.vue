<template>
    <v-loader-page
        v-model="page"
        :params="params"
        :title="title"
        :url="url"
        btn-go-main
        btn-reload
    >
        <v-container>
            <h1 class="text-h5 mb-4" v-text="$t(page.title)" />

            <v-row v-for="item in page.content">
                <v-col cols="12">
                    <component
                        :is="template(item.type)"
                        :content="item.content"
                    />
                </v-col>
            </v-row>
        </v-container>
    </v-loader-page>
</template>

<script lang="ts" setup>
import VLoaderPage from '@/components/pages/loader.vue'

import { ref } from 'vue'

import { contentType } from '@/helpers/contentType'

defineProps<{
    title?: string,
    url: string,
    params?: object
}>()

const page = ref({
    title: '',
    content: []
})

const template = (type: any) => contentType(type)
</script>
