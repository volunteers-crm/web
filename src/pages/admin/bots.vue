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
                                            <v-col cols="12" sm="4">
                                                <v-text-field
                                                    v-model="form.username"
                                                    :label="$t('Bot Username')"
                                                    :rules="telegramBotUsernameRule"
                                                    autofocus
                                                    variant="underlined"
                                                />
                                            </v-col>

                                            <v-col cols="11" sm="7">
                                                <v-text-field
                                                    v-model="form.token"
                                                    :label="$t('Bot Token')"
                                                    :rules="telegramTokenRule"
                                                    variant="underlined"
                                                />
                                            </v-col>

                                            <v-col cols="1" sm="1">
                                                <v-btn
                                                    flat
                                                    icon="mdi-information"
                                                    @click="dialogs.registerBot = true"
                                                />
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="12">
                                                <v-select
                                                    v-model="form.channels"
                                                    :items="channels"
                                                    :label="$t('Channels')"
                                                    chips
                                                    item-title="name"
                                                    item-value="id"
                                                    multiple
                                                    variant="underlined"
                                                />

                                                <p class="hint" v-text="$t('When you select channels, appeals will be published only in them.')" />
                                                <p class="hint" v-text="$t('Otherwise, coordinators will be asked to select channels for appeals publication.')" />
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
                v-for="bot in bots"
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
                        <v-card-title v-text="bot.username" />

                        <v-card-subtitle>
                            {{ locales[bot.locale] }} |
                            {{ bot.timezone }}
                        </v-card-subtitle>

                        <v-card-text v-if="bot.channels">
                            <p class="pb-4">
                                {{ $t('Appeals will be automatically published to the following channels:') }}
                            </p>

                            <p
                                v-for="channel in bot.channels"
                                :key="channel.id"
                            >
                                - {{ channel.name }}
                            </p>
                        </v-card-text>

                        <v-card-text v-else>
                            <p v-text="$t('Channels for automatic publication of appeals are not selected.')" />
                            <p v-text="$t('Coordinators will be asked to select channels for appeals publication.')" />
                        </v-card-text>


                        <v-card-actions>
                            <v-spacer />

                            <v-btn
                                @click="cardEdit[bot.id] = true"
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
                                <v-col cols="10">
                                    <v-text-field
                                        v-model="form.token"
                                        :label="$t('Bot Token')"
                                        :rules="telegramTokenRule"
                                        variant="underlined"
                                    />
                                </v-col>

                                <v-col cols="2">
                                    <v-btn
                                        flat
                                        icon="mdi-information"
                                        @click="dialogs.registerBot = true"
                                    />
                                </v-col>

                                <v-col cols="12">
                                    <v-select
                                        v-model="form.channels"
                                        :items="channels"
                                        :label="$t('Channels')"
                                        item-title="name"
                                        item-value="id"
                                        multiple
                                        variant="underlined"
                                    />
                                </v-col>
                            </v-row>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer />

                            <v-btn @click="updateBot(bot.id)">
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
                            Some text
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

    <v-dialog v-model="dialogs.registerBot">
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
                            <p class="mb-2" v-html="$t('To register a new bot, you need to go to the messages to the main @BotFather bot.')" />
                            <p class="mb-2" v-html="$t('Then send him the command /newbot and follow the instructions.')" />
                            <p class="mb-2" v-html="$t('When finished, @BotFather will provide you with your bot\'s token.')" />
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title>
                            {{ $t('Connecting a previously created bot') }}
                        </v-expansion-panel-title>

                        <v-expansion-panel-text>
                            <p class="mb-2" v-html="$t('To connect a previously created bot, you need to send the /mybots command to the @BotFather bot.')" />
                            <p API Token class="mb-2" v-html="$t('Then select the desired bot in the list and click the `API Token` button.')" />
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
import { API_BOTS_BOT, API_BOTS_INDEX } from '@/constants/api_routes'

import { computed, ref, watch } from 'vue'
import { trans } from 'laravel-vue-i18n'
import { useToast } from 'vue-toastification'

import _ from 'lodash'
import axios from 'axios'

import { timezones } from '@/helpers/date'
import locales from '@/constants/locales'
import { telegramBotUsernameRule, telegramTokenRule, timezoneRule } from '@/constants/validation'
import { bots } from '@/_fakes/bots'
import { channels } from '@/_fakes/channels'

const cardCreate = ref(false)
const cardEdit = ref({})
const cardDelete = ref({})
const cardLoading = ref({})

const dialogs = ref({
    registerBot: false
})

const form = ref({
    ref: {
        add: 'add-form'
    },

    validate: {
        add: false
    },

    username: '',
    token: '',
    channels: [],
    timezone: '',
    locale: 'en'
})

const colSize = computed(() => {
    const size = bots.length + 1

    const sizes = {
        1: 3,
        2: 6,
        3: 4
    }

    return _.get(sizes, size, 3)
})

const timezonesList = ref(timezones())

const localesList = computed(() => _.map(locales, (value, key) => Object.create({ value, key })))

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
    form.value.username = ''
    form.value.token = ''
    form.value.channels = []
    form.value.timezone = ''
    form.value.locale = 'en'
}

const addBot = () => {
    // validate form

    _.set(cardLoading.value, 'add', true)

    axios.post(API_BOTS_INDEX, form.value)
        .then((response: any) => {
            bots.push(response.data)

            toast.success(trans('Bot :name has been successfully attached to your account.', {
                name: response.data.name
            }))

            cardCreate.value = false
        })
        .finally(() => _.set(cardLoading.value, 'add', false))
}

const updateBot = (id: number) => {
    _.set(cardLoading.value, id, true)

    axios.put(API_BOTS_BOT.replace(':id', String(id)), form.value)
        .then((response: any) => {
            bots.push(response.data)

            toast.success(trans('Bot :name has been successfully attached to your account.', {
                name: response.data.name
            }))

            _.set(cardEdit.value, id, false)
        })
        .finally(() => _.set(cardLoading.value, id, false))
}

const deleteBot = (id: number) => {
    _.set(cardLoading.value, id, true)

    axios.delete(API_BOTS_BOT.replace(':id', String(id)))
        .then(() => {
            _.reject(bots, (bot: any) => bot.id === id)

            toast.success(trans('Bot has been successfully removed from your account.'))

            _.set(cardDelete.value, id, false)
        })
        .finally(() => _.set(cardLoading.value, id, false))
}
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

.card {
    &__reveal {

    }
}

.hint {
    color: grey;
    font-size: 9pt;
}
</style>
