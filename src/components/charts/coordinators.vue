<template>
    <v-card>
        <v-card-title>
            {{ $t('Curators & Coordinators') }}
        </v-card-title>

        <v-card-text>
            <apexchart
                :options="appeals.options"
                :series="appeals.series"
                height="200"
                type="bar"
            />

            <v-updated-info />
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import VUpdatedInfo from '@/components/info/data-updated-every-n-minutes.vue'

import { API_DASHBOARD_COORDINATORS } from '@/constants/api_routes'

import { computed, onBeforeMount, ref } from 'vue'
import { trans } from 'laravel-vue-i18n'
import { collect } from '@/helpers/collection'
import axios from 'axios'

const items = ref([])

const pluck = (key: string) => collect(items.value).pluck(key).get()

const appeals = computed(() => {
    return {
        options: {
            chart: {
                id: 'chart-coordinators',
                stacked: true
            },
            xaxis: {
                categories: pluck('name')
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
            }
        ]
    }
})

onBeforeMount(() => axios
    .get(API_DASHBOARD_COORDINATORS)
    .then(response => items.value = response.data)
)
</script>
