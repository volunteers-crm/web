<template>
    <v-container class="fill-height d-flex flex-column align-center justify-center" fluid>
        <h1 class="text-h4 mb-6">
            {{ $t(props.title) }}
        </h1>

        <div class="actions d-flex flex-row">
            <v-btn v-if="goBack" class="mx-2" color="primary" @click="goBackAction">
                {{ $t('go back') }}
            </v-btn>

            <v-btn v-if="reload" class="mx-2" color="primary" @click="reloadAction">
                {{ $t('reload') }}
            </v-btn>

            <v-btn v-if="goMain" class="mx-2" color="primary" @click="goHomeAction">
                {{ $t('home') }}
            </v-btn>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

import { ROUTE_MAIN } from '@/routes/names'

const router = useRouter()

const props = withDefaults(
    defineProps<{
        title: string,
        goBack?: boolean,
        goMain?: boolean,
        reload?: boolean
    }>(),
    {
        goBack: false,
        goMain: false,
        reload: false
    }
)

const goBackAction = () => router.back()
const goHomeAction = () => router.push({ name: ROUTE_MAIN })
const reloadAction = () => window.location.reload()
</script>
