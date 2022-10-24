<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-table>
                    <thead>
                    <tr>
                        <th v-text="$t('Channel')" />
                        <th v-text="$t('Bots')" />
                        <th v-text="$t('Open Appeals')" />
                        <th v-text="$t('Closed Appeals')" />
                        <th v-text="$t('Actions')" />
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="channel in channels"
                        :key="channel.id"
                    >
                        <td v-text="channel.name" />
                        <td v-text="botNames(channel.bots)" />
                        <td v-text="channel.appeals.open" />
                        <td v-text="channel.appeals.closed" />

                        <td>
                            <v-dialog
                                v-model="dialogs[channel.id]"
                                persistent
                            >
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        color="red darken-2"
                                        icon="mdi-delete"
                                        v-bind="props"
                                        variant="text"
                                    />
                                </template>

                                <v-card>
                                    <v-card-title>
                                        {{ $t('Confirm') }}
                                    </v-card-title>

                                    <v-card-text>
                                        <p
                                            v-html="$t('Are you sure you want to delete <strong>:name</strong> channel?', channel)"
                                        />

                                        <p
                                            v-if="!!channel.appeals.open"
                                            class="mt-2"
                                            v-text="$t('All non-closed appeals will be automatically cancelled, and we will notify the applicants.')"
                                        />
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer />

                                        <v-btn
                                            :disabled="loading"
                                            :loading="loading"
                                            color="red darken-2"
                                            @click="deleteChannel(channel.id)"
                                        >
                                            {{ $t('Agree') }}
                                        </v-btn>

                                        <v-btn
                                            :disabled="loading"
                                            @click="dialogs[channel.id] = false"
                                            v-text="$t('Cancel')"
                                        />
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </td>
                    </tr>
                    </tbody>
                </v-table>
            </v-col>

            <v-col cols="12">
                <v-textarea
                    :label="$t('To connect a new channel or group, you need to send a message to your channel or group with the following command:')"
                    :value="command"
                    append-icon="mdi-refresh"
                    append-inner-icon="mdi-refresh"
                    readonly
                    rows="2"
                    max-rows="5"
                    active
                    @click:append="getCommand"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { API_CHANNELS_CHANNEL, API_CHANNELS_COMMAND, API_CHANNELS_INDEX } from '@/constants/api_routes'

import { onMounted, ref } from 'vue'

import _ from 'lodash'
import axios from 'axios'

const channels = ref([])

const command = ref('Loading...')

const loading = ref(false)

const dialogs = ref({})

onMounted(() => {
    axios.get(API_CHANNELS_INDEX)
        .then((response: any) => channels.value = response.data)

    getCommand()
})

const getCommand = () => {
    axios.get(API_CHANNELS_COMMAND)
        .then((response: any) => command.value = response.data.command)
}

const deleteChannel = (id: number) => {
    loading.value = true

    axios.delete(API_CHANNELS_CHANNEL.replace(':id', String(id)))
        .then(() => _.reject(channels, (channel: any) => channel.id === id))
        .then(() => _.set(dialogs.value, id, false))
        .finally(() => loading.value = false)
}

const botNames = (bots: any) => {
    return _.map(bots, (bot: any) => bot.name).join(', ')
}
</script>
