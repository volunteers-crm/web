<template>
    <v-table fixed-header>
        <thead>
        <tr>
            <th>#</th>
            <th>{{ $t('Bot') }}</th>
            <th>{{ $t('Client') }}</th>
            <th>{{ $t('Curator') }}</th>
            <th class="text-center">{{ $t('Status') }}</th>
            <th class="text-center">{{ $t('Timezone') }}</th>
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
                    :id="item.bot.id"
                    :name="item.bot.name"
                    :username="item.bot.username"
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

            <td class="text-center text-lowercase">
                <v-status-btn :status="item.status" />
            </td>

            <td class="text-center">{{ item.bot.timezone }}</td>
            <td class="text-center" v-html="dateFormat(item.created_at)" />
            <td class="text-center" v-html="dateFormat(item.updated_at)" />
        </tr>
        </tbody>
    </v-table>
</template>

<script lang="ts" setup>
import VTelegramLink from '@/components/links/telegram.vue'
import VStatusBtn from '@/components/buttons/status.vue'

import { ROUTE_ADMIN_APPEALS_SHOW } from '@/routes/names'

import { dateFormatRows } from '@/helpers/date'
import { appeals } from '@/_fakes/appeals'

import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const items = ref(appeals)

const dateFormat = (date: string) => dateFormatRows(date)

const goTo = (id: number) => router.push({
    name: ROUTE_ADMIN_APPEALS_SHOW,
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
