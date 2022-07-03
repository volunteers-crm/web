<template>
    <v-container class="fill-height d-flex flex-column align-center justify-center">
        <h1 class="text-h4 mb-4">
            {{ $t(props.title) }}
        </h1>

        <v-btn v-if="goBack" color="primary" @click="goBackAction">
            {{ $t('go back') }}
        </v-btn>
    </v-container>
</template>

<script lang="ts" setup>
import {defineProps, onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const {commit} = useStore()
const router = useRouter()

const props = withDefaults(defineProps<{
    title: string,
    goBack: boolean
}>(), {
    goBack: false
})

const goBackAction = () => router.back()

onMounted(() => {
    commit('meta/setPageTitle', props.title)
})
</script>
