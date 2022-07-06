<template>
    <v-loader-page
        :params="params"
        :title="title"
        :url="url"
        btn-go-main
        btn-reload
    >
        <v-container>
            <h1 class="text-h4 mb-4" v-text="$t(data.title)" />

            <v-layout v-html="data.content" />
        </v-container>
    </v-loader-page>
</template>

<script lang="ts" setup>
import VLoaderPage from '@/components/pages/loader.vue'

import {defineProps, reactive} from "vue";
import {useStore} from "vuex";

const store = useStore()

defineProps<{
    title: string,
    url: string,
    params?: object
}>()

const data = reactive({
    title: '',
    content: ''
})
</script>
