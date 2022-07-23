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
                                    <v-card-title v-text="$t('Add roles')" />

                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-select
                                                    v-model="form.data.category"
                                                    :items="categories"
                                                    :label="$t('Role categories')"
                                                    chips
                                                    item-title="name"
                                                    item-value="id"
                                                    required
                                                    variant="underlined"
                                                />
                                            </v-col>

                                            <v-col cols="12">
                                                <v-roles
                                                    v-model="form.data.roles"
                                                    :label="$t('Role')"
                                                    required
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
                v-for="role in roles"
                :md="colSize"
                cols="12"
            >
                <v-hover v-slot="{ isHovering, props }">
                    <v-card
                        v-if="!cardEdit[role.id] && !cardDelete[role.id]"
                        :elevation="isHovering ? 4 : 1"
                        :loading="cardLoading[role.id]"
                        class="fill-height d-flex flex-column"
                        v-bind="props"
                    >
                        <v-card-title v-text="role.title" />

                        <v-card-text>
                            <p v-for="item in role.roles">
                                - {{ item.title }}
                            </p>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer />

                            <v-btn
                                @click="cardEdit[role.id] = true"
                            >
                                {{ $t('Edit') }}
                            </v-btn>

                            <v-btn
                                class="text-red-darken-1"
                                @click="cardDelete[role.id] = true"
                            >
                                {{ $t('Delete') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card
                        v-if="cardEdit[role.id]"
                        class="card__reveal"
                    >
                        <v-card-title v-text="role.title" />

                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-select
                                        v-model="form.data.category"
                                        :items="categories"
                                        :label="$t('Role categories')"
                                        chips
                                        item-title="name"
                                        item-value="id"
                                        required
                                        variant="underlined"
                                    />
                                </v-col>

                                <v-col cols="12">
                                    <v-roles
                                        v-model="form.data.roles"
                                        :label="$t('Role')"
                                        required
                                    />
                                </v-col>
                            </v-row>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer />

                            <v-btn @click="updateBot(role.id)">
                                {{ $t('Save') }}
                            </v-btn>

                            <v-btn @click="cardEdit[role.id] = false">
                                {{ $t('Cancel') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card
                        v-if="cardDelete[role.id]"
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
                                @click="cardDelete[role.id] = false"
                            >
                                {{ $t('No') }}
                            </v-btn>

                            <v-btn
                                class="text-red"
                                @click="deleteBot(role.id)"
                            >
                                {{ $t('Yes, delete') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
    </v-container>

    <v-dialog v-model="dialogs.createRole">
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
                    @click="dialogs.createRole = false"
                    v-text="$t('Close')"
                />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import VRoles from '@/components/lists/roles.vue'

import { API_BOTS_BOT, API_BOTS_INDEX } from '@/constants/api_routes'

import { computed, ref, watch } from 'vue'
import { trans } from '@/utils/lang'
import { useToast } from 'vue-toastification'

import _ from 'lodash'
import axios from 'axios'
import { bots } from '@/_fakes/bots'

const cardCreate = ref(false)
const cardEdit = ref({})
const cardDelete = ref({})
const cardLoading = ref({})

const dialogs = ref({
    createRole: false
})

const categories = ref(() => [])

const roles = ref(() => [])

const form = ref({
    ref: {
        add: 'add-form'
    },

    validate: {
        add: false
    },

    data: {
        category: null,
        roles: []
    }
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
    form.value.data.category = null
    form.value.data.roles = []
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
