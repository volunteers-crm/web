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
        >
            <td>{{ item.id }}</td>

            <td>
                <v-telegram-link
                    :id="item.chat.id"
                    :name="item.chat.name"
                    :username="item.chat.username"
                />
            </td>

            <td>
                <v-telegram-link
                    :id="item.client.id"
                    :name="item.client.name"
                    :username="item.client.username || item.client.id"
                    me
                />
            </td>

            <td>
                <v-telegram-link
                    v-if="item.curator"
                    :id="item.curator.id"
                    :name="item.curator.name"
                    :username="item.curator.username || item.curator.id"
                    me
                />

                <span v-else class="text-red" v-text="$t('No')" />
            </td>

            <td class="text-center">{{ item.source }}</td>

            <td class="text-center">
                <v-chip :color="statusColor(item.status)" label>
                    {{ item.status }}
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

import moment from "moment";

import {ref} from "vue";

const items = ref([
    {
        id: 1,
        chat: {
            username: 'help_chat',
            name: 'We Can Help',
            timezone: 'UTC'
        },
        client: {
            id: 123,
            username: 'john',
            name: 'John Doe'
        },
        curator: null,
        source: "help_bot",
        status: "in progress",
        created_at: "2022-07-05 23:48",
        updated_at: "2022-07-06 01:59"
    },
    {
        id: 2,
        chat: {
            username: 'help_chat2',
            name: 'Something',
            timezone: 'Europe/Moscow'
        },
        client: {
            id: 456,
            username: 'dave',
            name: 'Dave Helper'
        },
        curator: {
            id: 123,
            username: 'john',
            name: 'John Doe'
        },
        source: "crm",
        status: "new",
        created_at: "2022-07-06 20:48",
        updated_at: "2022-07-06 21:59"
    },
    {
        id: 3,
        chat: {
            username: 'help_chat',
            name: 'We Can Help',
            timezone: 'UTC'
        },
        client: {
            id: 678,
            username: 'olivia',
            name: 'Olivia'
        },
        curator: {
            id: 1,
            username: 'sandra_adams',
            name: 'Sandra Adams'
        },
        source: "crm",
        status: "new",
        created_at: "2022-07-06 20:48",
        updated_at: "2022-07-06 21:59"
    }
])

const dateFormat = (date: string) => {
    const value = moment(date)

    return `${value.format('YYYY-MM-DD')}<br>${value.format('HH:mm')}`
}

const statusColor = (status: string) => {
    switch (status) {
        case 'new':
            return 'info'
        case 'in progress':
            return 'green'
        default:
            return 'grey'
    }
}
</script>
