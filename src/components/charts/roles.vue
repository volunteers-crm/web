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

import { ref } from 'vue'

// TODO: remove fake generator
const count = 7

const randomData = () => {
    const min = 0
    const max = 10

    let values = []

    for (let i = 0; i < count; i++) {
        const value = Math.floor(Math.random() * (max - min + 1) + min)

        values.push(value)
    }

    return values
}

const roles = ref({
    options: {
        chart: {
            id: 'chart-roles',
            stacked: true
        },
        xaxis: {
            categories: [
                'curators',
                'housing',
                'cars',
                'clothes',
                'excursions',
                'medics',
                'psychologists'
            ]
        }
    },

    series: [
        {
            data: randomData()
        }
    ]
})
</script>
