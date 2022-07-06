<template>
    <v-info-page v-if="isLoading" :title="$t('Loading...')">
        <v-progress-circular
            color="purple"
            indeterminate
        />
    </v-info-page>

    <v-error-page v-if="isError" :title="errorMessage" go-back reload />

    <slot v-if="!isLoading && !isError" />
</template>

<script lang="ts" setup>
import VErrorPage from '@/components/pages/error.vue'
import VInfoPage from '@/components/pages/info.vue'

import {onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

import {setPageTitle} from "@/plugins/locale";
import api from '@/plugins/axios'

const route = useRoute()
const store = useStore()

const isLoading = ref(true)
const isError = ref(false)

const errorMessage = ref('')

const content = ref({})

const props = defineProps<{
    url: string,
    title: string
}>()

onBeforeMount(async () => await api
    .get(props.url)
    .then(response => {
        content.value = response?.data

        setPageTitle(route, props.title)
    })
    .catch(error => {
        errorMessage.value = error?.response?.data || error?.message

        isError.value = true

        setPageTitle(route, 'Whoops!')
    })
    .finally(() => isLoading.value = false)
)
</script>
