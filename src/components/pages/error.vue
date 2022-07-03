<template>
    <v-container class="fill-height d-flex flex-column align-center justify-center">
        <h1 class="text-h4 mb-6">
            {{ $t(props.title) }}
        </h1>

        <div class="actions d-flex flex-row">
            <v-btn v-if="goBack" class="mx-2" color="primary" @click="goBackAction">
                {{ $t('go back') }}
            </v-btn>

            <v-btn v-if="goHome" class="mx-2" color="primary" @click="goHomeAction">
                {{ $t('home') }}
            </v-btn>

            <v-btn v-if="reload" class="mx-2" color="primary" @click="reloadAction">
                {{ $t('reload') }}
            </v-btn>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import {defineProps, onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ROUTE_MAIN} from "@/routes/names";

const {commit} = useStore()
const router = useRouter()

const props = defineProps<{
    title: string,
    goBack?: boolean,
    goHome?: boolean,
    reload?: boolean
}>()

const goBackAction = () => router.back()
const goHomeAction = () => router.push({name: ROUTE_MAIN})
const reloadAction = () => window.location.reload()

onMounted(() => {
    commit('meta/setPageTitle', props.title)
})
</script>
