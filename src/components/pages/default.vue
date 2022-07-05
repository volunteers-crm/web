<template>
    <v-container v-if="!state.hasError">
        <h1 class="text-h4 mb-4" v-text="$t(state.title)" />

        <v-layout v-html="state.content" />
    </v-container>

    <v-error-page v-if="state.hasError" :title="$t(state.content)" reload />
</template>

<script lang="ts" setup>
import VErrorPage from '@/components/pages/error.vue'

import {defineProps, onBeforeMount, reactive} from "vue";
import {trans} from "laravel-vue-i18n";
import {useStore} from "vuex";

const props = defineProps<{
    slug: string
}>()

const store = useStore()

const state = reactive({
    hasError: false,
    title: '',
    content: trans('Loading...')
})

onBeforeMount(async () => {
    try {
        await store.dispatch('pages/loadMissing', props.slug)

        let item = await store.getters['pages/getPage'](props.slug)

        state.title = item.title;
        state.content = item.content;

        store.commit('meta/setPageTitle', item.title)
    } catch (e) {
        state.content = e.message

        switch (e.code) {
            case 'ERR_NETWORK':
                state.hasError = true
                break;
        }
    }
})
</script>
