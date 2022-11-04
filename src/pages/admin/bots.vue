<template>
    <v-container>
        <v-row>
            <v-col
                :md="colSize"
                cols="12"
            >
                <v-hover v-slot="{ isHovering, props }">
                    <v-card
                        :elevation="isHovering ? 4 : 1"
                        class="fill-height add-icon"
                        v-bind="props"
                    >
                        <v-card-text class="fill-height d-flex justify-center align-center">
                            <v-icon icon="mdi-plus" />
                        </v-card-text>

                        <v-dialog
                            v-model="cardCreate"
                            activator="parent"
                            persistent
                            max-width="800"
                        >
                            <v-form
                                :ref="form.ref.add"
                                v-model="form.validate.add"
                                :disabled="cardLoading['add']"
                                lazy-validation
                            >
                                <v-card min-width="800px">
                                    <v-card-title v-text="$t('New bot')" />

                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="11">
                                                <v-text-field
                                                    v-model="form.token"
                                                    :label="$t('Bot Token')"
                                                    :rules="telegramTokenRule"
                                                    variant="underlined"
                                                />
                                            </v-col>

                                            <v-col cols="1">
                                                <v-btn
                                                    flat
                                                    icon="mdi-information"
                                                    @click="dialogs.registerBot = true"
                                                />
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="12" md="6" sm="12">
                                                <v-autocomplete
                                                    v-model="form.timezone"
                                                    :items="timezonesList"
                                                    :label="$t('Timezone')"
                                                    :rules="timezoneRule"
                                                    class="mb-0 pb-0"
                                                    required
                                                    variant="underlined"
                                                />
                                            </v-col>

                                            <v-col cols="12" md="6" sm="12">
                                                <v-select
                                                    v-model="form.locale"
                                                    :items="localesList"
                                                    :label="$t('Localization')"
                                                    item-title="value"
                                                    item-value="key"
                                                    required
                                                    variant="underlined"
                                                />
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="12">
                                                <v-select
                                                    v-model="form.roles"
                                                    :items="roles"
                                                    :label="$t('Roles')"
                                                    item-title="title"
                                                    item-value="id"
                                                    multiple
                                                    required
                                                    variant="underlined"
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer />

                                        <v-btn
                                            :disabled="cardLoading['add'] || !form.validate.add"
                                            :loading="cardLoading['add']"
                                            @click="addBot"
                                        >
                                            {{ $t('Add') }}
                                        </v-btn>

                                        <v-btn
                                            :disabled="cardLoading['add']"
                                            @click="cardCreate = false"
                                            v-text="$t('Cancel')"
                                        />
                                    </v-card-actions>
                                </v-card>
                            </v-form>
                        </v-dialog>
                    </v-card>
                </v-hover>
            </v-col>

            <v-col
                v-for="(bot, index) in bots"
                :key="bot.id"
                :md="colSize"
                cols="12"
            >
                <v-hover v-slot="{ isHovering, props }">
                    <v-card
                        v-if="!cardEdit[bot.id] && !cardDelete[bot.id]"
                        :elevation="isHovering ? 4 : 1"
                        :loading="cardLoading[bot.id]"
                        class="fill-height d-flex flex-column"
                        v-bind="props"
                    >
                        <v-card-title class="d-flex justify-space-between flex-column flex-sm-row">
                            <div>
                                {{ bot.title }}
                            </div>

                            <div>
                                <v-chip color="blue" class="mr-2">
                                    {{ $t('Opened Appeals:') }}
                                    {{ bot.appeals.opened }}
                                </v-chip>

                                <v-chip color="green">
                                    {{ $t('Closed Appeals:') }}
                                    {{ bot.appeals.closed }}
                                </v-chip>
                            </div>
                        </v-card-title>

                        <v-card-subtitle>
                            {{ locales[bot.locale] }} |
                            {{ bot.timezone }}
                        </v-card-subtitle>

                        <v-card-text>
                            <div>
                                <p class="pb-1">
                                    {{ $t('Channels:') }}
                                </p>

                                <ul class="mx-6">
                                    <li v-if="! bot?.channels?.length">
                                        {{ $t('No channels') }}
                                    </li>
                                    <li
                                        v-else
                                        v-for="channel in bot.channels"
                                        :key="channel.id"
                                        v-text="channel.name"
                                    />
                                </ul>
                            </div>

                            <div class="pt-4">
                                <p class="pb-1">
                                    {{ $t('Roles:') }}
                                </p>

                                <ul v-if="! bot?.roles?.length" class="mx-6">
                                    <li>
                                        {{ $t('No roles') }}
                                    </li>
                                </ul>

                                <v-roles-chip
                                    v-else
                                    :roles="bot.roles"
                                />
                            </div>
                        </v-card-text>


                        <v-card-actions>
                            <v-spacer />

                            <v-btn
                                @click="cardEditEvent(bot)"
                            >
                                {{ $t('Edit') }}
                            </v-btn>

                            <v-btn
                                class="text-red-darken-1"
                                @click="cardDelete[bot.id] = true"
                            >
                                {{ $t('Delete') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card
                        v-if="cardEdit[bot.id]"
                        class="card__reveal"
                    >
                        <v-card-title v-text="bot.username" />

                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="6" sm="12">
                                    <v-autocomplete
                                        v-model="form.timezone"
                                        :items="timezonesList"
                                        :label="$t('Timezone')"
                                        :rules="timezoneRule"
                                        class="mb-0 pb-0"
                                        required
                                        variant="underlined"
                                    />
                                </v-col>

                                <v-col cols="12" md="6" sm="12">
                                    <v-select
                                        v-model="form.locale"
                                        :items="localesList"
                                        :label="$t('Localization')"
                                        item-title="value"
                                        item-value="key"
                                        required
                                        variant="underlined"
                                    />
                                </v-col>

                                <v-col cols="12" md="12" sm="12">
                                    <v-select
                                        v-model="form.roles"
                                        :items="roles"
                                        :label="$t('Roles')"
                                        item-title="title"
                                        item-value="id"
                                        multiple
                                        required
                                        variant="underlined"
                                    />
                                </v-col>
                            </v-row>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer />

                            <v-btn @click="updateBot(bot.id, index)">
                                {{ $t('Save') }}
                            </v-btn>

                            <v-btn @click="cardEdit[bot.id] = false">
                                {{ $t('Cancel') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card
                        v-if="cardDelete[bot.id]"
                        class="card__reveal"
                    >
                        <v-card-title>
                            You are sure?
                        </v-card-title>

                        <v-card-text>
                            <p v-text="$t('Are you sure you want to delete this bot?')" />
                            <p v-text="$t('We must warn you that deleting the bot will also permanently delete all appeals linked to it.')" />
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer />

                            <v-btn
                                class="text-green-darken-1"
                                @click="cardDelete[bot.id] = false"
                            >
                                {{ $t('No') }}
                            </v-btn>

                            <v-btn
                                class="text-red"
                                @click="deleteBot(bot.id)"
                            >
                                {{ $t('Yes, delete') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
    </v-container>

    <v-dialog
        v-model="dialogs.registerBot"
        max-width="800"
    >
        <v-card>
            <v-card-title>
                {{ $t('Bot Information') }}
            </v-card-title>

            <v-card-text>
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-title>
                            {{ $t('Registering a new bot') }}
                        </v-expansion-panel-title>

                        <v-expansion-panel-text>
                            <p class="mb-2" v-html="$t('To register a new bot, you need to go to the messages to the main :father bot.', { father: botFatherLink() })" />
                            <p class="mb-2" v-html="$t('Then send him the command :command and follow the instructions.', { command: codeBlock('/newbot') })" />
                            <p class="mb-2" v-html="$t('When finished, :father will provide you with your bot\'s token.', { father: botFatherLink() })" />
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title>
                            {{ $t('Connecting a previously created bot') }}
                        </v-expansion-panel-title>

                        <v-expansion-panel-text>
                            <p
                                class="mb-2"
                                v-html="$t('To connect a previously created bot, you need to send the :command command to the :father bot.', { father: botFatherLink(), command: codeBlock('/mybots') })" />
                            <p API Token class="mb-2" v-html="$t('Then select the desired bot in the list and click the :token button.', { token: codeBlock('API Token')})" />
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>

            <v-card-actions>
                <v-spacer />

                <v-btn
                    @click="dialogs.registerBot = false"
                    v-text="$t('Close')"
                />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import VRolesChip from '@/components/labels/roles.vue'

import { API_BOTS_BOT, API_BOTS_INDEX, API_ROLES_INDEX } from '@/constants/api_routes'
import { telegramTokenRule, timezoneRule } from '@/constants/validation'

import { computed, onBeforeMount, ref, watch } from 'vue'
import { trans } from 'laravel-vue-i18n'
import { useToast } from 'vue-toastification'

import _ from 'lodash'
import axios from 'axios'

import { timezones } from '@/helpers/date'
import locales from '@/constants/locales'
import { collect } from '@/helpers/collection'

const cardCreate = ref(false)
const cardEdit = ref({})
const cardDelete = ref({})
const cardLoading = ref({})

const dialogs = ref({
    registerBot: false
})

const bots = ref([])

const form = ref({
    ref: {
        add: 'add-form'
    },

    validate: {
        add: false
    },

    token: '',
    timezone: '',
    locale: 'en',
    roles: []
})

const colSize = computed(() => {
    const size = bots.value.length + 1

    const sizes = {
        1: 3,
        2: 6,
        3: 4
    }

    return _.get(sizes, size, 3)
})

const timezonesList = ref(timezones())

const localesList = computed(() => _.map(locales, (value, key) => Object.create({ value, key })))

const roles = ref([])

const toast = useToast()

watch(
    () => cardCreate.value,
    (val: boolean) => val && resetForm()
)

watch(
    () => cardEdit.value,
    (val: object) => !! _.filter(val, (item: boolean) => item) && resetForm()
)

watch(
    () => cardDelete.value,
    (val: object) => !! _.filter(val, (item: boolean) => item) && resetForm()
)

const resetForm = () => {
    form.value.token = ''
    form.value.timezone = ''
    form.value.locale = 'en'
    form.value.roles = []
}

onBeforeMount(() => {
    axios.get(API_BOTS_INDEX)
        .then((response: any) => bots.value = response.data)

    axios.get(API_ROLES_INDEX)
        .then((response: any) => roles.value = response.data)
})

const cardEditEvent = (bot: Bot) => {
    form.value.timezone = bot.timezone
    form.value.locale = bot.locale
    form.value.roles = collect(bot?.roles).pluck('id').get()

    cardEdit.value[bot.id] = true
}

const addBot = () => {
    // validate form

    _.set(cardLoading.value, 'add', true)

    axios.post(API_BOTS_INDEX, form.value)
        .then((response: any) => {
            bots.value.push(response.data)

            cardCreate.value = false

            toast.success(trans('Bot :name has been successfully attached to your account.', {
                name: response.data.name
            }))

        })
        .finally(() => _.set(cardLoading.value, 'add', false))
}

const updateBot = (id: number, index: number) => {
    _.set(cardLoading.value, id, true)

    axios.put(API_BOTS_BOT.replace(':id', String(id)), form.value)
        .then((response: any) => {
            bots.value[index] = response.data

            toast.success(trans(':name has been successfully updated.', {
                name: response.data.title
            }))

            _.set(cardEdit.value, id, false)
        })
        .finally(() => _.set(cardLoading.value, id, false))
}

const deleteBot = (id: number) => {
    _.set(cardLoading.value, id, true)

    axios.delete(API_BOTS_BOT.replace(':id', String(id)))
        .then(() => {
            bots.value = _.reject(bots.value, (bot: any) => bot.id === id)

            toast.success(trans('Bot has been successfully removed from your account.'))

            _.set(cardDelete.value, id, false)
        })
        .finally(() => _.set(cardLoading.value, id, false))
}

const botFatherLink = () => '<a href="https://t.me/BotFather" target="_blank">@BotFather</a>'

const codeBlock = (name: string) => `<code class="text-red">${ name }</code>`
</script>

<style lang="scss" scoped>
.add-icon {
    cursor: pointer;

    i {
        &.v-icon {
            caret-color: #9E9E9E !important;
            color: #9E9E9E !important;
            font-size: calc(var(--v-icon-size-multiplier) * 5em);
        }
    }
}

.hint {
    color: grey;
    font-size: 9pt;
}
</style>
