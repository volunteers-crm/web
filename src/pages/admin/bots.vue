<template>
    <v-table>
        <thead>
        <tr>
            <th v-text="$t('Bot Username')" />
            <th v-text="$t('Channels')" />
            <th v-text="$t('Actions')" />
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="bot in bots"
            :key="bot.id"
        >
            <td>
                {{ bot.username }}
            </td>

            <td>
                {{ channelNames(bot).join('<br>') }}
            </td>

            <td>
                <v-btn
                    icon="mdi-pencil"
                    size="small"
                    variant="text"
                />

                <v-btn
                    icon="mdi-delete"
                    size="small"
                    variant="text"
                />
            </td>
        </tr>
        </tbody>
    </v-table>
</template>

<script lang="ts" setup>
import { collect } from '@/helpers/collection'

import { bots } from '@/_fakes/bots'

const channelNames = (bot: any) => collect(bot?.channels || []).pluck('name').get()
</script>
