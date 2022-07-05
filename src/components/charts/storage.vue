<template>
    <v-card>
        <v-card-title>
            {{ $t('Storage') }}
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

// TODO: remove fake generator
const count = 5;

const randomData = () => {
    const min = 0
    const max = 30

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
            id: "chart-storage",
            stacked: true
        },
        xaxis: {
            categories: [
                'suitcases',
                'men\'s clothing',
                'women\'s clothing',
                'kid\'s clothing',
                'food to go',
            ],
        },
    },

    series: [
        {
            name: '@emma',
            data: randomData(),
        },
        {
            name: '@liam',
            data: randomData(),
        },
        {
            name: '@charlotte',
            data: randomData(),
        },
    ]
})
</script>
