<template>
    <v-card>
        <v-card-title>
            {{ $t('Appeals') }}
        </v-card-title>

        <v-card-text>
            <apexchart
                :options="appeals.options"
                :series="appeals.series"
                height="200"
                type="area"
            />

            <v-updated-info />
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import VUpdatedInfo from '@/components/info/data-updated-every-n-minutes.vue'

import { API_DASHBOARD_APPEALS } from '@/constants/api_routes'

import { computed, onBeforeMount, ref } from 'vue'
import { trans } from 'laravel-vue-i18n'
import axios from 'axios'
import { collect } from '@/helpers/collection'

const items = ref([])

const pluck = (key: string) => collect(items.value).pluck(key).get()

const appeals = computed(() => {
    return {
        options: {
            chart: {
                id: 'chart-appeals'
            },
            xaxis: {
                categories: pluck('date')
            }
        },

        series: [
            {
                name: trans('opened'),
                data: pluck('statuses.opened')
            },
            {
                name: trans('solved'),
                data: pluck('statuses.solved')
            },
            {
                name: trans('cancelled'),
                data: pluck('statuses.cancelled')
            },
            {
                name: trans('unassigned'),
                data: pluck('statuses.unassigned')
            }
        ]
    }
})

onBeforeMount(() => axios
    .get(API_DASHBOARD_APPEALS)
    .then(response => items.value = response.data)
)
</script>
