<template>
    <v-container v-if="!state.hasError">
        <h1 class="text-h4 mb-4">
            {{ $t(state.title) }}
        </h1>

        <v-layout v-html="state.content" />
    </v-container>

    <v-error-page v-if="state.hasError" :title="state.title" reload />
</template>

<script lang="ts" setup>
import VErrorPage from '@/components/pages/error.vue'

import {defineProps, onBeforeMount, reactive} from "vue";
import {trans} from "laravel-vue-i18n";
import {useStore} from "vuex";

const {commit, getters, dispatch} = useStore()

const props = defineProps<{
    slug: string
}>()

const state = reactive({
    hasError: false,
    title: '',
    content: trans('Loading...')
})

onBeforeMount(async () => {
    try {
        await dispatch('pages/loadMissing', props.slug)

        let item = await getters['pages/getPage'](props.slug)

        state.title = item.title;
        state.content = item.content;

        commit('meta/setPageTitle', item.title)
    } catch (e) {
        state.title = trans(e.message)
        state.content = ''

        switch (e.code) {
            case 'ERR_NETWORK':
                state.hasError = true
                break;
        }
    }
})
</script>
