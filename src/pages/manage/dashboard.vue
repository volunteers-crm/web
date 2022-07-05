<template>
    <v-row>
        <v-col>
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

                    <div
                        class="text-right text-grey-darken-1"
                        v-text="$t('Updated every 15 minutes.')"
                    />
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {trans} from "laravel-vue-i18n";

// TODO: remove fake generator
const randomData = () => {
    const min = 10
    const max = 90

    let values = [];

    for (let i = 0; i < 8; i++) {
        const value = Math.floor(Math.random() * (max - min + 1) + min)

        values.push(value)
    }

    return values
}

const issues = ref({
    options: {
        chart: {
            id: "vuechart-example",
        },
        xaxis: {
            categories: [
                '2022-07-05',
                '2022-07-04',
                '2022-07-03',
                '2022-07-02',
                '2022-07-01',
                '2022-06-30',
                '2022-06-29',
                '2022-06-28',
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
        }
    ]
})
</script>
