<template>
    <v-card>
        <v-card-title>
            {{ $t('Storage') }}
        </v-card-title>

        <v-card-text>
            <apexchart
                :options="storage.options"
                :series="storage.series"
                height="200"
                type="bar"
            />

            <v-updated-info />
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import VUpdatedInfo from '@/components/info/data-updated-every-n-minutes.vue'

import { API_DASHBOARD_STORAGES } from '@/constants/api_routes'

import { computed, onBeforeMount, ref } from 'vue'
import { collect } from '@/helpers/collection'
import axios from 'axios'
import _ from 'lodash'

const items = ref([])

const pluck = (key: string) => collect(items.value).pluck(key).get()

const pluckUsers = () => {
    let users: any[] = []

    _.each(items.value, (item: any) => {
        _.each(item.users, (user: any) => {
            if (! _.includes(users, user.name)) {
                _.set(users, user.name, {
                    name: user.name,
                    data: []
                })
            }

            users[user.name].data.push(user.count)
        })
    })

    return _.values(users)
}

const storage = computed(() => {
    return {
        options: {
            chart: {
                id: 'chart-storage',
                stacked: true
            },
            xaxis: {
                categories: pluck('name')
            }
        },

        series: pluckUsers()
    }
})

onBeforeMount(() => axios
    .get(API_DASHBOARD_STORAGES)
    .then(response => items.value = response.data)
)
</script>
