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

import moment from 'moment'
import { ref } from 'vue'
import { trans } from '@/utils/lang'

// TODO: remove fake generator
const count = 5

const randomData = () => {
    const min = 10
    const max = 90

    let values = []

    for (let i = 0; i < count; i++) {
        const value = Math.floor(Math.random() * (max - min + 1) + min)

        values.push(value)
    }

    return values
}

const randomDates = () => {
    let values = []

    for (let i = count; i > 0; i--) {
        const date = moment().day(i * -1).format('MMMM, Do')

        values.push(date)
    }

    return values
}

const appeals = ref({
    options: {
        chart: {
            id: 'chart-appeals'
        },
        xaxis: {
            categories: randomDates()
        }
    },

    series: [
        {
            name: trans('opened'),
            data: randomData()
        },
        {
            name: trans('solved'),
            data: randomData()
        },
        {
            name: trans('cancelled'),
            data: randomData()
        },
        {
            name: trans('unassigned'),
            data: randomData()
        }
    ]
})
</script>
