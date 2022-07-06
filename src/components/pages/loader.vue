<template>
    <v-info-page v-if="isLoading" :title="$t('Loading...')">
        <v-progress-circular
            color="purple"
            indeterminate
        />
    </v-info-page>

    <v-error-page
        v-if="isError"
        :go-back="btnGoBack"
        :go-main="btnGoMain"
        :reload="btnReload"
        :title="errorMessage"
    />

    <slot v-if="!isLoading && !isError" v-bind="content" />
</template>

<script lang="ts" setup>
import VErrorPage from '@/components/pages/error.vue'
import VInfoPage from '@/components/pages/info.vue'

import {computed, onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

import _ from 'lodash'

import {setPageTitle} from "@/plugins/locale";
import api from '@/plugins/axios'

const route = useRoute()
const store = useStore()

const isLoading = ref(true)
const isError = ref(false)

const errorMessage = ref('')

const content = ref({})

const props = defineProps<{
    title: string
    url: string,
    params?: object,
    btnGoBack?: boolean,
    btnGoMain?: boolean,
    btnReload?: boolean,
    noCache?: boolean
}>()

const requestUrl = computed(() => {
    let url = props.url;

    _.each(props?.params || {}, (value: any, key: any) => {
        url = url.replace(`:${key}`, value)
    })

    return url
})

onBeforeMount(async () => {
    if (!props.noCache && store.getters['pages/hasPage'](requestUrl.value)) {
        content.value = store.getters['pages/getPage'](requestUrl.value)

        isLoading.value = false

        return;
    }

    await api
        .get(requestUrl.value)
        .then(response => {
            content.value = response?.data

            setPageTitle(route, props.title)
        })
        .catch(error => {
            errorMessage.value = error?.response?.data || error?.message

            isError.value = true
        })
        .finally(() => {
            setPageTitle(route, props.title)

            isLoading.value = false
        })
})
</script>
