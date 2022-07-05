<template>
    <v-card>
        <v-card-title>
            {{ $t('Curators & Coordinators') }}
        </v-card-title>

        <v-card-text>
            <apexchart
                :options="issues.options"
                :series="issues.series"
                height="200"
                type="bar"
            />

            <div
                class="text-right text-grey-darken-1"
                v-text="$t('Updated every 15 minutes.')"
            />
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {trans} from "laravel-vue-i18n";

// TODO: remove fake generator
const count = 8;

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

const issues = ref({
    options: {
        chart: {
            id: "chart-coordinators",
            stacked: true
        },
        xaxis: {
            categories: [
                '@emma',
                '@liam',
                '@charlotte',
                '@oliver',
                '@amelia',
                '@noah',
                '@olivia',
                '@elijah'
            ],
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
    ]
})
</script>
