<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        {{ $t('Enabled') }}
                    </v-card-title>

                    <v-card-text>
                        <v-table>
                            <thead>
                            <tr>
                                <th v-text="$t('Username')" />
                                <th v-text="$t('Name')" />
                                <th v-text="$t('Timezone')" />
                                <th v-text="$t('Open Issues')" />
                                <th v-text="$t('Closed Issues')" />
                                <th v-text="$t('Actions')" />
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="channel in channels"
                                :key="channel.id"
                            >
                                <td v-text="`@${channel.username}`" />
                                <td v-text="channel.name" />
                                <td v-text="channel.timezone" />
                                <td v-text="channel.issues.open" />
                                <td v-text="channel.issues.closed" />

                                <td>
                                    <v-dialog
                                        v-model="dialogs.show[channel.id]"
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
                                                    v-html="$t('Are you sure you want to disable <strong>:name</strong> channel from the ticket management system?', channel)"
                                                />

                                                <p
                                                    v-if="!!channel.issues.open"
                                                    class="mt-2"
                                                    v-text="$t('All non-closed issues will be automatically completed, and we will notify the applicants.')"
                                                />
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer />

                                                <v-btn
                                                    :disabled="!!dialogs.loading[channel.id]"
                                                    :loading="!!dialogs.loading[channel.id]"
                                                    color="red darken-2"
                                                    @click="disableChannel(channel.id)"
                                                >
                                                    {{ $t('Agree') }}
                                                </v-btn>

                                                <v-btn
                                                    :disabled="!!dialogs.loading[channel.id]"
                                                    @click="dialogs.show[channel.id] = false"
                                                    v-text="$t('Cancel')"
                                                />
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </td>
                            </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col>
                <v-card>
                    <v-card-title>
                        {{ $t('Available') }}
                    </v-card-title>

                    <v-card-text>
                        <v-table>
                            <thead>
                            <tr>
                                <th v-text="$t('Username')" />
                                <th v-text="$t('Name')" />
                                <th v-text="$t('Actions')" />
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="channel in availableChannels"
                                v-if="availableChannels.length"
                                :key="channel.id"
                            >
                                <td v-text="`@${channel.username}`" />
                                <td v-text="channel.name" />

                                <td>
                                    <v-btn
                                        color="green darken-2"
                                        icon="mdi-plus"
                                        variant="text"
                                    />
                                </td>
                            </tr>
                            <tr v-else>
                                <td class="text-center" colspan="3">
                                    {{ $t('We did not find the channels you created.') }}
                                </td>
                            </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { API_CHANNELS_AVAILABLE, API_CHANNELS_CHANNEL } from '@/constants/api_routes'

import { channels } from '@/_fakes/channels'
import { onMounted, ref } from 'vue'

import _ from 'lodash'
import axios from 'axios'

const availableChannels = ref([])

const dialogs = ref({
    show: {},
    loading: {}
})

const disableChannel = (id: number) => {
    _.set(dialogs.value.loading, id, true)

    axios.delete(API_CHANNELS_CHANNEL.replace(':id', String(id)))
        .then(() => _.reject(channels, (channel: any) => channel.id === id))
        .finally(() => {
            _.set(dialogs.value.loading, id, false)
            _.set(dialogs.value.show, id, false)
        })
}

onMounted(() => axios.get(API_CHANNELS_AVAILABLE)
    .then((response: any) => availableChannels.value = response.data)
)
</script>
