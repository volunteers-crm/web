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

    <slot
        v-if="!isLoading && !isError"
        :props="content"
    />
</template>

<script lang="ts" setup>
import VErrorPage from '@/components/pages/error.vue'
import VInfoPage from '@/components/pages/info.vue'

import { computed, onBeforeMount, ref } from 'vue'

import _ from 'lodash'
import axios from 'axios'

import { useMetaStore } from '@/stores/meta'
import { usePageStore } from '@/stores/page'

const metaStore = useMetaStore()
const pageStore = usePageStore()

const isLoading = ref(true)
const isError = ref(false)

const errorMessage = ref('')

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(
    defineProps<{
        modelValue?: any,
        title: string
        url: string,
        params?: object,
        btnGoBack?: boolean,
        btnGoMain?: boolean,
        btnReload?: boolean,
        noCache?: boolean,
    }>(), {
        btnGoBack: false,
        btnGoMain: false,
        btnReload: false,
        noCache: false
    })

const content = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
})

const requestUrl = computed(() => {
    let url = props.url

    _.each(props?.params || {}, (value: any, key: any) => {
        url = url.replace(`:${ key }`, value)
    })

    return url
})

const setPageTitle = () => {
    metaStore.setPageTitle(props.title, props?.params)
}

onBeforeMount(async () => {
    if (! props.noCache && pageStore.has(requestUrl.value)) {
        content.value = pageStore.get(requestUrl.value)

        isLoading.value = false

        return
    }

    await axios
        .get(requestUrl.value)
        .then(response => content.value = response?.data)
        .catch(error => {
            errorMessage.value = error?.response?.data?.message || error?.message

            isError.value = true
        })
        .finally(() => setPageTitle())
        .finally(() => isLoading.value = false)
})
</script>
