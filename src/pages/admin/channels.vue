<template>
    <v-container>
        <v-row>
            <v-col cols="7" md="7" sm="12">
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
                                v-for="channel in enabledChannels"
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
                                                    :disabled="dialogs.loading"
                                                    :loading="dialogs.loading"
                                                    color="red darken-2"
                                                    @click="disableChannel(channel.id)"
                                                >
                                                    {{ $t('Agree') }}
                                                </v-btn>

                                                <v-btn
                                                    :disabled="dialogs.loading"
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

            <v-col cols="5" md="5" sm="12">
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
                                    <v-dialog
                                        v-model="dialogs.connect[channel.id]"
                                        persistent
                                    >
                                        <template v-slot:activator="{ props }">
                                            <v-btn
                                                color="green darken-2"
                                                icon="mdi-plus"
                                                v-bind="props"
                                                variant="text"
                                            />
                                        </template>

                                        <v-card
                                            min-width="800px"
                                            width="100%"
                                        >
                                            <v-form
                                                ref="connectForm"
                                                v-model="form.valid"
                                                lazy-validation
                                            >
                                                <v-card-title>
                                                    {{ $t('Connect') }}
                                                </v-card-title>

                                                <v-card-text>
                                                    <v-container>
                                                        <v-row>
                                                            <v-col cols="12" md="6" sm="12">
                                                                <v-text-field
                                                                    v-model="form.data.username"
                                                                    :disabled="true"
                                                                    :label="$t('Username')"
                                                                    :model-value="channel.username"
                                                                    readonly
                                                                />
                                                            </v-col>

                                                            <v-col cols="12" md="6" sm="12">
                                                                <v-text-field
                                                                    v-model="form.data.name"
                                                                    :disabled="true"
                                                                    :label="$t('Name')"
                                                                    :model-value="channel.name"
                                                                    readonly
                                                                />
                                                            </v-col>
                                                        </v-row>

                                                        <v-row>
                                                            <v-col cols="12" md="6" sm="12">
                                                                <v-autocomplete
                                                                    v-model="form.data.timezone"
                                                                    :items="timezonesList"
                                                                    :label="$t('Timezone')"
                                                                    :rules="form.rules.timezone"
                                                                    autofocus
                                                                    required
                                                                />
                                                            </v-col>

                                                            <v-col cols="12" md="6" sm="12">
                                                                <v-select
                                                                    v-model="form.data.locale"
                                                                    :items="localesList"
                                                                    :label="$t('Localization')"
                                                                    item-title="value"
                                                                    item-value="key"
                                                                    required
                                                                />
                                                            </v-col>
                                                        </v-row>

                                                        <v-row>
                                                            <v-col cols="12" md="6" sm="12">
                                                                <v-combobox
                                                                    v-model="form.data.storage"
                                                                    :label="$t('Storage')"
                                                                    closable-chips
                                                                    multiple
                                                                    required
                                                                >
                                                                    <template v-slot:selection="{ attrs, item, select, selected }">
                                                                        <v-chip
                                                                            :input-value="selected"
                                                                            closable
                                                                            v-bind="attrs"
                                                                            @click="select"
                                                                            @click:close="removeStorageChip(item.title)"
                                                                        >
                                                                            <strong>{{ item.title.trim() }}</strong>
                                                                            <span>(interest)</span>
                                                                        </v-chip>
                                                                    </template>
                                                                </v-combobox>

                                                                <div class="hint">
                                                                    <p v-text="$t('Enter any storage name.')" />
                                                                    <p v-text="$t('Press Enter to apply the changes.')" />
                                                                    <p v-text="$t('The maximum number is :count names.', { count: maxStorageCount })" />
                                                                </div>
                                                            </v-col>

                                                            <v-col cols="12" md="6" sm="12">
                                                                <v-combobox
                                                                    v-model="form.data.roles"
                                                                    :label="$t('Roles')"
                                                                    closable-chips
                                                                    multiple
                                                                    required
                                                                />

                                                                <div class="hint">
                                                                    <p v-text="$t('Enter any role name.')" />
                                                                    <p v-text="$t('Press Enter to apply the changes.')" />
                                                                    <p v-text="$t('The maximum number is :count names.', { count: maxRolesCount })" />
                                                                </div>
                                                            </v-col>
                                                        </v-row>

                                                        <v-row>
                                                            <v-col cols="12" md="6" sm="12">
                                                                <v-text-field
                                                                    v-model="form.data.bot.username"
                                                                    :label="$t('Bot Username')"
                                                                    :rules="form.rules.bot.username"
                                                                    required
                                                                />
                                                            </v-col>

                                                            <v-col cols="12" md="6" sm="12">
                                                                <v-text-field
                                                                    v-model="form.data.bot.token"
                                                                    :label="$t('Bot Token')"
                                                                    :rules="form.rules.bot.token"
                                                                    required
                                                                />
                                                            </v-col>
                                                        </v-row>
                                                    </v-container>
                                                </v-card-text>

                                                <v-card-actions>
                                                    <v-spacer />

                                                    <v-btn
                                                        :color="dialogs.loading || !form.valid ? 'red lighten-4' : 'red darken-2'"
                                                        :disabled="dialogs.loading || !form.valid"
                                                        :loading="dialogs.loading"
                                                        @click="connectChannel(channel.id)"
                                                    >
                                                        {{ $t('Agree') }}
                                                    </v-btn>

                                                    <v-btn
                                                        :disabled="dialogs.loading"
                                                        @click="dialogs.connect[channel.id] = false"
                                                        v-text="$t('Cancel')"
                                                    />
                                                </v-card-actions>
                                            </v-form>
                                        </v-card>
                                    </v-dialog>
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
import { API_CHANNELS_AVAILABLE, API_CHANNELS_CHANNEL, API_CHANNELS_INDEX } from '@/constants/api_routes'

import { channels } from '@/_fakes/channels'
import { computed, onMounted, ref } from 'vue'

import { useSettingsStore } from '@/stores/settings'
import { timezones } from '@/helpers/date'
import locales from '@/constants/locales'

import _ from 'lodash'
import axios from 'axios'
import { trans } from 'laravel-vue-i18n'

const settingsStore = useSettingsStore()

const enabledChannels = ref(channels)
const availableChannels = ref([])

const timezonesList = ref(timezones())

const maxStorageCount = computed(() => settingsStore.storage.count)
const maxRolesCount = computed(() => settingsStore.roles.count)

const localesList = computed(() => {
    return _.map(locales, (value, key) => Object.create({ value, key }))
})

const dialogs = ref({
    show: {},
    connect: {},
    loading: false
})

const connectForm = ref()

const form = ref({
    valid: false,
    data: {
        username: null,
        name: null,
        timezone: null,
        locale: null,
        storage: [],
        roles: [],
        bot: {
            username: null,
            token: null
        }
    },
    rules: {
        timezone: [
            (v: any) => !! v || trans('This field is required.'),
            (v: any) => timezonesList.value.includes(v) || trans('This must be a valid timezone.')
        ],

        bot: {
            username: [
                (v: any) => !! v || trans('This field is required.'),
                (v: any) => (_.endsWith(v, '_bot') || _.endsWith(v, 'Bot')) || trans('This must end with one of the following: :values.', { values: '_bot, Bot' })
            ],
            token: [
                (v: any) => !! v || trans('This field is required.'),
                (v: any) => /^\d+:AAE.{32}$/.test(v) || trans('This format is invalid.')
            ]
        }
    }
})

const removeStorageChip = (value: string) => {
    form.value.data.storage.splice(form.value.data.storage.indexOf(value), 1)
    form.value.data.storage = [...form.value.data.storage]
}
const removeRolesChip = (value: any) => _.reject(form.value.data.roles, (item: string) => item === value)

const disableChannel = (id: number) => {
    dialogs.value.loading = true

    axios.delete(API_CHANNELS_CHANNEL.replace(':id', String(id)))
        .then(() => _.reject(channels, (channel: any) => channel.id === id))
        .finally(() => {
            dialogs.value.loading = false
            _.set(dialogs.value.show, id, false)
        })
}

const connectChannel = (id: number) => {
    connectForm.value.validate()

    dialogs.value.loading = true

    axios.post(API_CHANNELS_INDEX, Object.assign(form.value.data, { id }))
        .then(response => {
            _.reject(availableChannels.value, (channel: any) => channel.id === id)

            enabledChannels.value.push(response.data)

            _.set(dialogs.value.connect, id, false)
        })
        .finally(() => dialogs.value.loading = false)
}

onMounted(() => axios.get(API_CHANNELS_AVAILABLE)
    .then((response: any) => availableChannels.value = response.data)
    .catch(() => availableChannels.value = channels)
)
</script>

<style lang="scss" scoped>
.hint {
    color: grey;
    font-size: 9pt;
    margin-top: -20px;
}
</style>
