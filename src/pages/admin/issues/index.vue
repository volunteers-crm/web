<template>
    <v-table fixed-header>
        <thead>
        <tr>
            <th>#</th>
            <th>{{ $t('Chat') }}</th>
            <th>{{ $t('Client') }}</th>
            <th>{{ $t('Curator') }}</th>
            <th class="text-center">{{ $t('Source') }}</th>
            <th class="text-center">{{ $t('Status') }}</th>
            <th class="text-center">{{ $t('Chat Timezone') }}</th>
            <th class="text-center">{{ $t('Created At') }}</th>
            <th class="text-center">{{ $t('Updated At') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in items"
            :key="item.id"
            class="table__row"
            @click="goTo(item.id)"
        >
            <td>{{ item.id }}</td>

            <td>
                <v-telegram-link
                    :id="item.chat.id"
                    :name="item.chat.name"
                    :username="item.chat.username"
                    text
                />
            </td>

            <td>
                <v-telegram-link
                    :id="item.client.id"
                    :name="item.client.name"
                    :username="item.client.username || item.client.id"
                    me
                    text
                />
            </td>

            <td>
                <v-telegram-link
                    v-if="item.curator"
                    :id="item.curator.id"
                    :name="item.curator.name"
                    :username="item.curator.username || item.curator.id"
                    me
                    text
                />

                <span v-else class="text-red" v-text="$t('No')" />
            </td>

            <td class="text-center">{{ item.source }}</td>

            <td class="text-center text-lowercase">
                <v-chip :color="color(item.status)" label>
                    {{ $t(item.status) }}
                </v-chip>
            </td>

            <td class="text-center">{{ item.chat.timezone }}</td>
            <td class="text-center" v-html="dateFormat(item.created_at)" />
            <td class="text-center" v-html="dateFormat(item.updated_at)" />
        </tr>
        </tbody>
    </v-table>
</template>

<script lang="ts" setup>
import VTelegramLink from '@/components/links/telegram.vue'

import { ROUTE_ADMIN_ISSUES_SHOW } from '@/routes/names'

import { color } from '@/helpers/status-color'
import { issues } from '@/_fakes/issues'

import moment from 'moment'

import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const items = ref(issues)

const dateFormat = (date: string) => {
    const value = moment(date)

    return `${ value.format('YYYY-MM-DD') }<br>${ value.format('HH:mm') }`
}

const goTo = (id: number) => router.push({
    name: ROUTE_ADMIN_ISSUES_SHOW,
    params: { id }
})
</script>

<style lang="scss" scoped>
.table__row {
    cursor: pointer;
    transition: background-color .2s ease;

    &:nth-child(even) {
        background-color: rgba(242, 243, 250, 0.4);
    }

    &:hover {
        background-color: #E8EAF6 !important;
    }
}
</style>
