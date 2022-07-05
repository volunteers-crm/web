<template>
    <v-card>
        <v-card-title>
            {{ $t('Issues') }}
        </v-card-title>

        <v-card-text>
            <apexchart
                :options="issues.options"
                :series="issues.series"
                height="200"
                type="area"
            />

            <v-updated-info />
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import VUpdatedInfo from '@/components/info/data-updated-every-n-minutes.vue'

import {ref} from "vue";
import {trans} from "laravel-vue-i18n";

import moment from "moment";

// TODO: remove fake generator
const count = 5;

const randomData = () => {
    const min = 10
    const max = 90

    let values = [];

    for (let i = 0; i < count; i++) {
        const value = Math.floor(Math.random() * (max - min + 1) + min)

        values.push(value)
    }

    return values
}

const randomDates = () => {
    let values = [];

    for (let i = count; i > 0; i--) {
        const date = moment().day(i * -1).format('MMMM, Do')

        values.push(date)
    }

    return values;
}

const issues = ref({
    options: {
        chart: {
            id: "chart-issues",
        },
        xaxis: {
            categories: randomDates(),
        },
    },

    series: [
        {
            name: trans('opened'),
            data: randomData(),
        },
        {
            name: trans('solved'),
            data: randomData(),
        },
        {
            name: trans('cancelled'),
            data: randomData(),
        },
        {
            name: trans('unassigned'),
            data: randomData(),
        }
    ]
})
</script>
