<template>
    <v-container>
        <h1 class="text-h4 mb-4" v-text="pageTitle" />

        <v-form :disabled="finding || sending" @submit.prevent="findBot">
            <v-card elevation="0">
                <v-card-text class="mx-0 px-0">
                    <p class="mb-2">
                        {{ $t('Specify a link to the bot you want to become the coordinator of:') }}
                    </p>

                    <v-text-field
                        v-model="form.bot"
                        :hint="$t('For example, @VolunteersCrmBot or https://t.me/VolunteersCrmBot.')"
                        :label="$t('Bot Username')"
                        autofocus
                        density="comfortable"
                    />
                </v-card-text>

                <v-card-actions class="justify-center">
                    <v-btn
                        :disabled="finding || hasDisabledBotFind"
                        :loading="finding"
                        class="px-10"
                        color="primary"
                        type="submit"
                        variant="elevated"
                    >
                        {{ $t('Find a team') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>

        <v-form :disabled="finding || sending" @submit.prevent="sendForm">
            <v-fade-transition>
                <v-card v-if="hasLoadedBot" elevation="0">
                    <v-card-text class="mx-0 px-0">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    v-model="form.name"
                                    :label="$t('What is your name?')"
                                    density="comfortable"
                                />
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field
                                    v-model="form.city"
                                    :label="$t('What city do you live in?')"
                                    density="comfortable"
                                />
                            </v-col>

                            <v-col cols="12">
                                <v-todo
                                    v-model="form.socials"
                                    :label="$t('Social Network')"
                                    density="comfortable"
                                />
                            </v-col>

                            <v-col cols="12">
                                <v-textarea
                                    v-model="form.about"
                                    :label="$t('Please tell us about yourself! If you have experience volunteering or working in social projects, don\'t forget to mention!')"
                                    rows="3"
                                />
                            </v-col>

                            <v-col cols="12">
                                <v-textarea
                                    v-model="form.source"
                                    :hint="$t('We carefully and attentively treat the information we work with, so it is very important for us to understand who the people who come to us are. If there are specific people who referred you, please refer to them.')"
                                    :label="$t('How did you hear about volunteering for the :name project?', { name: botName })"
                                    rows="3"
                                />
                            </v-col>

                            <v-col cols="12">
                                <v-todo
                                    v-model="form.recommendations"
                                    :hint="$t('If you can be recommended by one of the current project participants, write here his or her telegram-nickname.')"
                                    :label="$t('Recommendations')"
                                    density="comfortable"
                                />
                            </v-col>

                            <v-col cols="12">
                                <v-select
                                    v-model="form.roles"
                                    :items="botRoles"
                                    :label="$t('Choose the role you are interested in')"
                                    chips
                                    item-title="title"
                                    item-value="id"
                                    multiple
                                />
                            </v-col>

                            <v-col cols="12">
                                <v-checkbox
                                    v-model="form.is_coordinator"
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
                        </v-row>
                    </v-card-text>

                    <v-card-actions class="justify-center">
                        <v-btn
                            :disabled="sending"
                            :loading="sending"
                            class="px-10"
                            color="primary"
                            type="submit"
                            variant="elevated"
                        >
                            {{ $t('Sent') }}
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

import axios from 'axios'
import { computed, ref } from 'vue'
import { useMetaStore } from '@/stores/meta'

import { hasValidTelegramUsername } from '@/helpers/validation'
import { cleanTelegramUsername } from '@/helpers/cleaners'
import { botSearch } from '@/_fakes/bots'
import { useToast } from 'vue-toastification'
import { useBecomeStore } from '@/stores/become'

const metaStore = useMetaStore()
const becomeStore = useBecomeStore()
const toast = useToast()

const pageTitle = computed(() => metaStore.pageTitle)

const finding = ref(false)
const sending = ref(false)

const form = ref({
    bot: null,
    name: null,
    city: null,
    socials: [],
    about: null,
    source: null,
    recommendations: [],
    roles: [],
    is_coordinator: false
})

const botName = computed(() => becomeStore.name)
const botRoles = computed(() => becomeStore.roles)

const hasDisabledBotFind = computed(() => ! hasValidTelegramUsername(form.value.bot))

const hasLoadedBot = computed(() => !! becomeStore.id)

const findBot = () => {
    finding.value = true

    const username = cleanTelegramUsername(form.value.bot || '')

    axios.get(API_BOTS_SEARCH, { params: { username } })
        .then((response: any) => becomeStore.set(response))
        .finally(() => finding.value = false)

    // TODO: remove this fake activation
    becomeStore.set(botSearch)
}

const sendForm = () => {
    sending.value = true

    axios.post(API_VOLUNTEERS_INDEX, form.value)
        .then((response: any) => {
            toast.success(response)

            becomeStore.reset()
        })
        .finally(() => sending.value = false)
}
</script>
