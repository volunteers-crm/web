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
                                <td v-text="$t('Username')" />
                                <td v-text="$t('Name')" />
                                <td v-text="$t('Timezone')" />
                                <td v-text="$t('Open Issues')" />
                                <td v-text="$t('Closed Issues')" />
                                <td v-text="$t('Actions')" />
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="chat in chats"
                                :key="chat.id"
                            >
                                <td v-text="`@${chat.username}`" />
                                <td v-text="chat.name" />
                                <td v-text="chat.timezone" />
                                <td v-text="chat.issues.open" />
                                <td v-text="chat.issues.closed" />

                                <td>
                                    <v-dialog
                                        v-model="dialogs.show[chat.id]"
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
                                                    v-html="$t('Are you sure you want to disable <strong>:name</strong> chat from the ticket management system?', chat)"
                                                />

                                                <p
                                                    v-if="!!chat.issues.open"
                                                    class="mt-2"
                                                    v-text="$t('All non-closed issues will be automatically completed, and we will notify the applicants.')"
                                                />
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer />

                                                <v-btn
                                                    :disabled="!!dialogs.loading[chat.id]"
                                                    :loading="!!dialogs.loading[chat.id]"
                                                    color="red darken-2"
                                                    @click="disableChat(chat.id)"
                                                >
                                                    {{ $t('Agree') }}
                                                </v-btn>

                                                <v-btn
                                                    :disabled="!!dialogs.loading[chat.id]"
                                                    @click="dialogs.show[chat.id] = false"
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
                                <td v-text="$t('Username')" />
                                <td v-text="$t('Name')" />
                                <td v-text="$t('Actions')" />
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="chat in chats"
                                :key="chat.id"
                            >
                                <td v-text="`@${chat.username}`" />
                                <td v-text="chat.name" />

                                <td>
                                    <v-btn
                                        color="green darken-2"
                                        icon="mdi-plus"
                                        variant="text"
                                    />
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
import { API_CHATS_CHAT } from '@/constants/api_routes'

import { chats } from '@/_fakes/chats'
import { ref } from 'vue'

import _ from 'lodash'
import axios from 'axios'

const dialogs = ref({
    show: {},
    loading: {}
})

const disableChat = (id: number) => {
    _.set(dialogs.value.loading, id, true)

    axios.delete(API_CHATS_CHAT.replace(':id', String(id)))
        .then(() => _.reject(chats, (chat: any) => chat.id === id))
        .finally(() => {
            _.set(dialogs.value.loading, id, false)
            _.set(dialogs.value.show, id, false)
        })

}
</script>
