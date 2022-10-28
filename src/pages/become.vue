<template>
    <v-container>
        <h1 class="text-h4 mb-4" v-text="pageTitle" />

        <v-form
            ref="findForm"
            :disabled="finding || sending"
            lazy-validation
            @submit.prevent="findBot"
        >
            <v-card elevation="0">
                <v-card-text class="mx-0 px-0">
                    <p class="mb-2">
                        {{ $t("Specify a link to the bot you want to become the coordinator of:") }}
                    </p>

                    <v-text-field
                        v-model="becomeStore.form.bot"
                        :disabled="hasDisabledFindBot"
                        :hint="$t('For example, @VolunteersCrmBot or https://t.me/VolunteersCrmBot.')"
                        :label="$t('Bot Username')"
                        :rules="rules.bot"
                        autofocus
                        density="comfortable"
                        required
                    />
                </v-card-text>

                <v-card-actions class="justify-center">
                    <v-btn
                        :color="buttonColor(finding || sending || hasDisabledFindBot)"
                        :disabled="finding || sending || hasDisabledFindBot"
                        :loading="finding"
                        class="px-10"
                        type="submit"
                        variant="elevated"
                    >
                        {{ $t("Find a team") }}
                    </v-btn>

                    <v-btn
                        :color="buttonColor(finding || sending || !becomeStore.form.bot, 'warning')"
                        :disabled="finding || sending || !becomeStore.form.bot"
                        class="px-10"
                        variant="elevated"
                    >
                        {{ $t("Find new team") }}

                        <v-dialog
                            v-model="resetDialog"
                            max-width="800"
                            activator="parent"
                        >
                            <v-card>
                                <v-card-title>
                                    {{ $t("Confirmation") }}
                                </v-card-title>

                                <v-card-text>
                                    {{ $t("Are you sure you want to delete all the data entered in the form and find a new team?") }}
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer />

                                    <v-btn
                                        color="red"
                                        @click="resetForm"
                                        v-text="$t('Confirm')"
                                    />

                                    <v-btn
                                        @click="resetDialog = false"
                                        v-text="$t('Cancel')"
                                    />
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>

        <v-form
            ref="sendForm"
            :disabled="finding || sending"
            lazy-validation
            @submit.prevent="submit"
        >
            <v-fade-transition>
                <v-card v-if="becomeStore.hasBot" elevation="0">
                    <v-card-text class="mx-0 px-0">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    v-model="becomeStore.form.name"
                                    :label="$t('What is your name?')"
                                    :rules="rules.name"
                                    density="comfortable"
                                    required
                                />
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field
                                    v-model="becomeStore.form.city"
                                    :label="$t('What city do you live in?')"
                                    :rules="rules.city"
                                    density="comfortable"
                                    required
                                />
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-select
                                    v-model="becomeStore.form.roles"
                                    :items="botRoles"
                                    :label="$t('Choose the role you are interested in')"
                                    :rules="rules.roles"
                                    chips
                                    item-title="title"
                                    item-value="id"
                                    multiple
                                    required
                                >
                                    <template v-slot:chip="{ item, props }">
                                        <v-chip
                                            :text="item.title"
                                            closable
                                            v-bind="props"
                                        />
                                    </template>

                                    <template v-slot:item="{ item }">
                                        <v-list-subheader v-if="item?.title?.header" class="text-subtitle-1">
                                            {{ item.title.header }}
                                        </v-list-subheader>

                                        <v-list-item v-else @click="selectRole(item)">
                                            <template v-slot:prepend>
                                                <v-checkbox-btn
                                                    :model-value="hasSelectedRole(item)"
                                                    color="primary"
                                                    hide-details
                                                />
                                            </template>

                                            <v-list-item-title v-text="item.title" />

                                            <template v-if="item.raw.is_storage" v-slot:append>
                                                <v-tooltip location="top">
                                                    <template v-slot:activator="{ props }">
                                                        <v-icon v-bind="props">
                                                            mdi-package-variant
                                                        </v-icon>
                                                    </template>

                                                    {{ $t("Storage") }}
                                                </v-tooltip>
                                            </template>
                                        </v-list-item>
                                    </template>
                                </v-select>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-checkbox
                                    v-model="becomeStore.form.is_coordinator"
                                    color="primary"
                                >
                                    <template v-slot:label>
                                        <div>
                                            <p v-text="$t('I want to coordinate')" />
                                            <p
                                                class="text-caption"
                                                v-text="$t('We always need responsible people who will lead specific people: in this role, you need to delve into the situation, understand what people have needs and connect them with the relevant organizations / volunteers, stay in touch and control what is happening.')"
                                            />
                                        </div>
                                    </template>
                                </v-checkbox>
                            </v-col>

                            <v-col cols="12">
                                <v-textarea
                                    v-model="becomeStore.form.about"
                                    :counter="maxTextLength"
                                    :label="$t('Please tell us about yourself! If you have experience volunteering or working in social projects, don\'t forget to mention!')"
                                    :rules="rules.about"
                                    required
                                    rows="3"
                                />
                            </v-col>

                            <v-col cols="12">
                                <v-textarea
                                    v-model="becomeStore.form.source"
                                    :counter="maxTextLength"
                                    :hint="$t('We carefully and attentively treat the information we work with, so it is very important for us to understand who the people who come to us are. If there are specific people who referred you, please refer to them.')"
                                    :label="$t('How did you hear about volunteering for the :name project?', { name: becomeStore.bot.name })"
                                    rows="3"
                                />
                            </v-col>

                            <v-col cols="12">
                                <v-todo
                                    v-model="becomeStore.form.socials"
                                    :label="$t('Social Network')"
                                    :rules="rules.socials"
                                    density="comfortable"
                                    required
                                />
                            </v-col>

                            <v-col cols="12">
                                <v-todo
                                    v-model="becomeStore.form.recommendations"
                                    :hint="$t('If you can be recommended by one of the current project participants, write here his or her telegram-nickname.')"
                                    :label="$t('Recommendations')"
                                    density="comfortable"
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions class="justify-center">
                        <v-btn
                            :color="buttonColor(sending)"
                            :disabled="sending"
                            :loading="sending"
                            class="px-10"
                            type="submit"
                            variant="elevated"
                        >
                            {{ $t("Sent") }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-fade-transition>
        </v-form>
    </v-container>
</template>

<script lang="ts" setup>
import VTodo from '@/components/lists/todo.vue'

import { API_BOTS_SEARCH, API_VOLUNTEERS_INDEX } from '@/constants/api_routes'

import { listRule, nameRule, rolesRule, telegramBotUsernameRule, textRequired } from '@/constants/validation'

import axios from 'axios'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'

import { useBecomeStore } from '@/stores/become'
import { useMetaStore } from '@/stores/meta'

import { validator } from '@/helpers/validation'
import { cleanTelegramUsername } from '@/helpers/cleaners'
import { collect } from '@/helpers/collection'
import { botSearch } from '@/_fakes/bots'
import { useSettingsStore } from '@/stores/settings'

const metaStore = useMetaStore()
const becomeStore = useBecomeStore()
const settingsStore = useSettingsStore()
const toast = useToast()

const pageTitle = computed(() => metaStore.pageTitle)

const findForm: any = ref(null)
const sendForm: any = ref(null)

const finding = ref(false)
const sending = ref(false)

const resetDialog = ref(false)

const rules = ref({
    bot: telegramBotUsernameRule,
    name: nameRule,
    city: textRequired,
    roles: rolesRule,
    about: textRequired,
    socials: listRule
})

const maxTextLength = computed(() => settingsStore.text.count)

const botRoles = computed(() => collect(becomeStore.bot.roles).getFromGrouped())

const hasDisabledFindBot = computed(() => becomeStore.hasBot)

const buttonColor = (has_disable: boolean, color: string = 'primary') => has_disable ? 'default' : color

const findBot = () => {
    validator(findForm, () => {
        finding.value = true

        const username = cleanTelegramUsername(becomeStore.form.bot || '')

        axios.get(API_BOTS_SEARCH, { params: { username } })
            .then((response: any) => becomeStore.setBot(response))
            .finally(() => finding.value = false)

        // TODO: remove this fake activation
        becomeStore.setBot(botSearch)
    })
}

const submit = () => {
    validator(sendForm, () => {
        sending.value = true

        axios.post(API_VOLUNTEERS_INDEX, becomeStore.form)
            .then((response: any) => {
                toast.success(response)

                becomeStore.reset()
            })
            .finally(() => sending.value = false)
    })
}

const resetForm = () => {
    becomeStore.reset()

    resetDialog.value = false
}

const findRoleIndex = (item: any): number => {
    return becomeStore.form.roles.findIndex(id => id === item.value)
}

const selectRole = (item: any) => {
    const index = findRoleIndex(item)

    if (index === -1) {
        becomeStore.form.roles.push(item.value)
    } else {
        const value = [...becomeStore.form.roles]

        value.splice(index, 1)

        becomeStore.form.roles = value
    }
}

const hasSelectedRole = (item: object): boolean => {
    return findRoleIndex(item) !== -1
}
</script>
