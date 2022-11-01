<template>
    <v-card>
        <v-card-title>
            {{ $t('Roles') }}
        </v-card-title>

        <v-card-text>
            <apexchart
                :options="roles.options"
                :series="roles.series"
                height="200"
                type="bar"
            />

            <v-updated-info />
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import VUpdatedInfo from '@/components/info/data-updated-every-n-minutes.vue'

import { API_DASHBOARD_ROLES } from '@/constants/api_routes'

import { computed, onBeforeMount, ref } from 'vue'
import { collect } from '@/helpers/collection'
import axios from 'axios'

const items = ref([])

const pluck = (key: string) => collect(items.value).pluck(key).get()

const roles = computed(() => {
    return {
        options: {
            chart: {
                id: 'chart-roles',
                stacked: true
            },
            xaxis: {
                categories: pluck('name')
            }
        },

        series: [
            {
                data: pluck('count')
            }
        ]
    }
})

onBeforeMount(() => axios
    .get(API_DASHBOARD_ROLES)
    .then(response => items.value = response.data)
)
</script>
