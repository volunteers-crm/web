<template>
    <v-loader-page
        v-slot="{ props }"
        :fake="appeal"
        :params="params"
        :title="meta.title"
        :url="url"
        no-cache
    >
        <v-container class="fill-height py-0" fluid>
            <v-row class="fill-height" no-gutters>
                <v-col cols="3">
                    <v-user :user="props.client" />

                    <v-divider />

                    <v-card elevation="0">
                        <v-card-text>
                            <v-status-btn
                                :status="props.status"
                                class="d-flex justify-center align-center"
                            />
                        </v-card-text>
                    </v-card>

                    <v-divider />

                    <v-card v-if="!props.curator" elevation="0">
                        <v-card-title>
                            {{ $t('Curator') }}
                        </v-card-title>

                        <v-card-text class="text-red">
                            <p>
                                {{ $t('Curator not appointed') }}
                            </p>

                            <v-btn
                                :disabled="hasTakeToWork"
                                :loading="hasTakeToWork"
                                block
                                class="mt-2"
                                color="primary"
                                flat
                                size="small"
                                @click="takeToWork"
                            >
                                {{ $t('Take to work') }}
                            </v-btn>
                        </v-card-text>
                    </v-card>

                    <v-card v-else class="scrollable" elevation="0">
                        <v-form :disabled="hasDisabledForm(props)">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="form.address"
                                            :label="$t('Address')"
                                            hide-details
                                            prepend-icon="mdi-map-marker"
                                            variant="underlined"
                                        />
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="form.date"
                                            :label="$t('Date and Time')"
                                            hide-details
                                            prepend-icon="mdi-calendar"
                                            type="datetime-local"
                                            variant="underlined"
                                        />
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="form.persons"
                                            :label="$t('Number of persons')"
                                            hide-details
                                            min="0"
                                            prepend-icon="mdi-account-group"
                                            type="number"
                                            variant="underlined"
                                        />
                                    </v-col>

                                    <v-col cols="12">
                                        <v-todo v-model="form.todo" />
                                    </v-col>

                                    <v-col cols="12">
                                        <v-textarea
                                            v-model="form.comment"
                                            :label="$t('Comment')"
                                            :placeholder="$t('Write a comment about appeal...')"
                                            auto-grow
                                            hide-details
                                            persistent-placeholder
                                            rows="2"
                                            variant="underlined"
                                        />
                                    </v-col>

                                    <v-col cols="12">
                                        <v-select
                                            v-model="form.channels"
                                            :items="props.bot?.channels"
                                            :label="$t('Channels')"
                                            hide-details
                                            item-title="name"
                                            item-value="id"
                                            multiple
                                            variant="underlined"
                                        />
                                    </v-col>
                                </v-row>
                            </v-card-text>

                            <v-card-actions v-if="!hasDisabledForm(props)">
                                <v-spacer />

                                <v-btn
                                    block
                                    color="primary"
                                    variant="elevated"
                                    @click="preview = true"
                                >
                                    Preview
                                </v-btn>
                            </v-card-actions>
                        </v-form>

                        <v-dialog
                            v-model="preview"
                            max-width="800"
                            persistent
                        >
                            <v-card>
                                <v-card-text>
                                    <p class="font-weight-bold mb-4">
                                        {{ $t('Appeal #:id', { id: props.id }) }}
                                    </p>

                                    <p v-if="form.date" class="mb-4">
                                        📅 {{ formatDate(form.date) }}, {{ props.bot.timezone }}
                                    </p>

                                    <p v-if="form.address" class="mb-4">
                                        🌍 <span v-text="form.address" />
                                    </p>

                                    <p v-if="form.persons" class="mb-4">
                                        👨‍👨‍👧‍👧 {{ $t('Number of persons') }}: {{ form.persons }}
                                    </p>

                                    <div v-if="previewTodo.length" class="mb-4">
                                        <p>
                                            {{ $t('Need') }}:
                                        </p>

                                        <p v-for="todo in previewTodo">
                                            - {{ todo }}
                                        </p>
                                    </div>

                                    <p v-if="form.comment" class="mb-4">
                                        {{ form.comment }}
                                    </p>

                                    <p>
                                        👤 @{{ props.curator.username }}
                                    </p>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer />

                                    <v-btn
                                        :disabled="!allowToPublish || publishing"
                                        :loading="publishing"
                                        variant="tonal"
                                        @click="publish"
                                    >
                                        {{ $t('Publish') }}
                                    </v-btn>

                                    <v-btn
                                        @click="preview = false"
                                        v-text="$t('Close')"
                                    />
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-card>
                </v-col>

                <v-col cols="7">
                    <v-chat
                        :appeal-id="props.id"
                        :status="props.status"
                    />
                </v-col>

                <v-col cols="2">
                    <v-card elevation="0">
                        <v-card-title>
                            {{ $t('Curator') }}
                        </v-card-title>

                        <v-card-text v-if="!!props.curator" class="pa-0">
                            <v-user
                                :user="props.curator"
                                allow-me
                            />
                        </v-card-text>

                        <v-card-text v-else class="text-red">
                            <p>
                                {{ $t('Curator not appointed') }}
                            </p>

                            <v-btn
                                :disabled="hasTakeToWork"
                                :loading="hasTakeToWork"
                                block
                                class="mt-2"
                                color="primary"
                                flat
                                size="small"
                                @click="takeToWork"
                            >
                                {{ $t('Take to work') }}
                            </v-btn>
                        </v-card-text>
                    </v-card>

                    <v-divider />

                    <v-card elevation="0">
                        <v-card-title>
                            {{ $t('Source') }}
                        </v-card-title>

                        <v-card-text>
                            <p v-text="props.bot.title" />
                            <p class="text-grey" v-text="`@${props.bot.name}`" />
                        </v-card-text>
                    </v-card>

                    <v-divider />

                    <v-card elevation="0">
                        <v-card-text>
                            <p class="date__info">
                                <span>{{ $t('Created At') }}:</span>
                                {{ formatDate(props.created_at) }}
                            </p>

                            <p class="date__info">
                                <span>{{ $t('Updated At') }}:</span>
                                {{ formatDate(props.updated_at) }}
                            </p>

                            <p class="date__info">
                                <span>{{ $t('Timezone') }}:</span>
                                {{ props.bot.timezone }}
                            </p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-loader-page>
</template>

<script lang="ts" setup>
import VLoaderPage from '@/components/pages/loader.vue'
import VStatusBtn from '@/components/buttons/status.vue'
import VChat from '@/components/chats/chat.vue'
import VUser from '@/components/info/user.vue'
import VTodo from '@/components/lists/todo.vue'

import { API_APPEALS_PUBLISH, API_APPEALS_SHOW, API_APPEALS_START_WORK } from '@/constants/api_routes'

import { useUserStore } from '@/stores/user'
import { dateFormatFull } from '@/helpers/date'

import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import _ from 'lodash'
import { useToast } from 'vue-toastification'
import { trans } from 'laravel-vue-i18n'

const { meta, params } = useRoute()

const userStore = useUserStore()
const toast = useToast()

const url = ref(API_APPEALS_SHOW.replace(':id', params.id))

const appeal = ref(null)

const form = ref({
    address: null,
    date: null,
    persons: 0,
    todo: [''],
    comment: null,
    channels: []
})

const preview = ref(false)
const publishing = ref(false)

const formatDate = (date: string) => dateFormatFull(date)

const hasDisabledForm = (data: any) => data?.curator?.id !== userStore?.user?.id || !! publishing.value

const hasTakeToWork = ref(false)

const takeToWork = () => {
    hasTakeToWork.value = true

    axios.post(API_APPEALS_START_WORK.replace(':id', params.id))
        .then((response: any) => appeal.value = response.data)
        .finally(() => hasTakeToWork.value = false)
}

const previewTodo = computed(() => {
    return _.filter(form.value.todo, (item: string) => !! item)
})

const allowToPublish = computed(() => {
    const value = form.value
    const todo = previewTodo.value

    if (! value.channels.length) {
        return false
    }

    return value.address || value.date || value.persons || value.comment || todo.length
})

const publish = () => {
    publishing.value = true

    axios.post(API_APPEALS_PUBLISH.replace(':id', params.id), form.value)
        .then(() => {
            toast.success(trans('The appeal was successfully submitted to the queue for publication.'))

            preview.value = false
        })
        .finally(() => publishing.value = false)
}
</script>

<style lang="scss" scoped>
.date {
    &__info {
        span {
            color: #949494;
        }
    }
}

.scrollable {
    max-height: calc(100vh - 64px - 96px - 73px - 65px);
    overflow-y: auto;
}
</style>
