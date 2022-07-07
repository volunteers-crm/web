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

    <slot v-if="!isLoading && !isError" />
</template>

<script lang="ts" setup>
import VErrorPage from '@/components/pages/error.vue'
import VInfoPage from '@/components/pages/info.vue'

import { computed, onBeforeMount, ref } from 'vue'
import { useMetaStore, usePageStore } from '@/store'

import _ from 'lodash'

import api from '@/plugins/axios'

const metaStore = useMetaStore()
const pageStore = usePageStore()

const isLoading = ref(true)
const isError = ref(false)

const errorMessage = ref('')

const content = ref({})

const props = withDefaults(defineProps<{
    title: string
    url: string,
    params?: object,
    btnGoBack?: boolean,
    btnGoMain?: boolean,
    btnReload?: boolean,
    noCache?: boolean,
    fake: any,
    fakeTimeout?: number
}>(), {
    fake: {},
    fakeTimeout: 1500
})

const requestUrl = computed(() => {
    let url = props.url

    _.each(props?.params || {}, (value: any, key: any) => {
        url = url.replace(`:${ key }`, value)
    })

    return url
})

onBeforeMount(async () => {
    if (props.fake) {
        await setTimeout(() => {
            content.value = props.fake

            metaStore.setPageTitle(props.title)

            isLoading.value = false
        }, props.fakeTimeout)

        return
    }

    if (! props.noCache && pageStore.has(requestUrl.value)) {
        content.value = pageStore.get(requestUrl.value)

        isLoading.value = false

        return
    }

    await api
        .get(requestUrl.value)
        .then(response => content.value = response?.data)
        .catch(error => {
            errorMessage.value = error?.response?.data || error?.message

            isError.value = true
        })
        .finally(() => {
            metaStore.setPageTitle(props.title)

            isLoading.value = false
        })
})
</script>
