<template>
    <v-loader-page
        v-model="appeal"
        :params="params"
        :title="meta.title"
        :url="url"
        no-cache
    >
        <v-container class="fill-height py-0" fluid>
            <v-row class="fill-height" no-gutters>
                <v-col cols="3">
                    <v-card elevation="0">
                        <v-card-text class="d-flex justify-space-between align-center">
                            <v-status-btn
                                :status="appeal.status"
                                class="d-flex justify-center align-center status__fill-width"
                            />

                            <div
                                v-if="!appeal.is_closed && appeal.status !== STATUS_NEW"
                                class="status__actions"
                            >
                                <v-confirm
                                    v-model="appeal"
                                    :button-text="$t('Done')"
                                    :confirm-text="$t('Are you sure you want to mark the appeal as completed?')"
                                    :url="resolveAppealUrl(API_APPEALS_DONE)"
                                    variant="text"
                                    color="green"
                                />

                                <v-confirm
                                    v-model="appeal"
                                    :button-text="$t('Cancel')"
                                    :confirm-text="$t('Are you sure you want to cancel the appeal?')"
                                    :url="resolveAppealUrl(API_APPEALS_CANCEL)"
                                    method="delete"
                                    variant="text"
                                    color="red"
                                />
                            </div>
                        </v-card-text>
                    </v-card>

                    <v-divider />

                    <v-card v-if="!appeal.curator" elevation="0">
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
                        <v-form :disabled="hasDisabledForm()">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="form.address"
                                            :label="$t('Address')"
                                            hide-details
                                            prepend-icon="mdi-map-marker"
                                            variant="underlined"
                                            density="compact"
                                        />
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="formDate"
                                            :label="$t('Date and Time')"
                                            hide-details
                                            prepend-icon="mdi-calendar"
                                            type="datetime-local"
                                            variant="underlined"
                                            density="compact"
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
                                            density="compact"
                                        />
                                    </v-col>

                                    <v-col cols="12">
                                        <v-todo v-model="form.todo" density="compact" />
                                    </v-col>

                                    <v-col cols="12">
                                        <v-textarea
                                            v-model="form.comment"
                                            :label="$t('Comment') + ' *'"
                                            :placeholder="$t('Write a comment about appeal...')"
                                            auto-grow
                                            hide-details
                                            persistent-placeholder
                                            rows="2"
                                            variant="underlined"
                                            density="compact"
                                        />
                                    </v-col>

                                    <v-col cols="12">
                                        <v-select
                                            v-model="form.channels"
                                            :items="appeal.bot?.channels"
                                            :label="$t('Channels') + ' *'"
                                            :disabled="hasDisabledChannelsChoice"
                                            hide-details
                                            item-title="name"
                                            item-value="id"
                                            multiple
                                            variant="underlined"
                                            density="compact"
                                        />
                                    </v-col>
                                </v-row>
                            </v-card-text>

                            <v-card-actions v-if="!hasDisabledForm()">
                                <v-spacer />

                                <v-btn
                                    :disabled="hasDisabledPreview"
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
                                        {{ $t('Appeal #:id', { id: appeal.id }) }}
                                    </p>

                                    <p v-if="form.date" class="mb-4">
                                        📅 {{ formatDate(form.date) }}, {{ appeal.bot.timezone }}
                                    </p>

                                    <p v-if="form.address" class="mb-4">
                                        🌍 <span v-text="form.address" />
                                    </p>

                                    <p v-if="form.persons > 0" class="mb-4">
                                        👨‍👨‍👧‍👧 {{ $t('Number of persons') }}: {{ form.persons }}
                                    </p>

                                    <div v-if="previewTodo.length" class="mb-4">
                                        <p>
                                            {{ $t('Todo:') }}
                                        </p>

                                        <p v-for="todo in previewTodo">
                                            - {{ todo }}
                                        </p>
                                    </div>

                                    <p v-if="form.comment" class="mb-4">
                                        {{ form.comment }}
                                    </p>

                                    <p>
                                        👤 {{ appeal.curator.name }}
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
                        :appeal-id="appeal.id"
                        :status="appeal.status"
                    />
                </v-col>

                <v-col cols="2">
                    <v-card elevation="0">
                        <v-card-title>
                            {{ $t('Client') }}
                        </v-card-title>

                        <v-card-text class="pa-0">
                            <v-user :user="appeal.client" />
                        </v-card-text>
                    </v-card>

                    <v-divider />

                    <v-card elevation="0">
                        <v-card-title>
                            {{ $t('Curator') }}
                        </v-card-title>

                        <v-card-text v-if="!!appeal.curator" class="pa-0">
                            <v-user
                                :user="appeal.curator"
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
                            <p v-text="appeal.bot.title" />
                            <p class="text-grey" v-text="`@${appeal.bot.name}`" />
                        </v-card-text>
                    </v-card>

                    <v-divider />

                    <v-card elevation="0">
                        <v-card-text>
                            <p class="date__info">
                                <span>{{ $t('Created At') }}:</span>
                                {{ formatDate(appeal.created_at) }}
                            </p>

                            <p class="date__info">
                                <span>{{ $t('Updated At') }}:</span>
                                {{ formatDate(appeal.updated_at) }}
                            </p>

                            <p class="date__info">
                                <span>{{ $t('Timezone') }}:</span>
                                {{ appeal.bot.timezone }}
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
import VConfirm from '@/components/dialogs/confirm.vue'

import { API_APPEALS_CANCEL, API_APPEALS_DONE, API_APPEALS_PUBLISH, API_APPEALS_SHOW, API_APPEALS_START_WORK } from '@/constants/api_routes'
import { STATUS_NEW } from '@/constants/statuses'

import { useUserStore } from '@/stores/user'
import { dateCustomFormat, dateFormatFull } from '@/helpers/date'

import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import _ from 'lodash'
import { useToast } from 'vue-toastification'
import { trans } from 'laravel-vue-i18n'

const { meta, params } = useRoute()

const userStore = useUserStore()
const toast = useToast()

const url = ref(API_APPEALS_SHOW.replace(':id', params.id))

const appeal = ref({})

const form = ref({
    address: null,
    date: null,
    persons: 0,
    todo: [],
    comment: null,
    channels: []
})

const preview = ref(false)
const publishing = ref(false)

watch(
    () => appeal.value,
    (val: any) => form.value = val?.info || {}
)

const formatDate = (date: string) => dateFormatFull(date)

const formDate = computed({
    get: () => dateCustomFormat(form.value.date, 'YYYY-MM-DDTHH:mm'),
    set: (val: any) => form.value.date = val
})

const hasDisabledForm = () => appeal.value?.curator?.id !== userStore?.user?.id || !! publishing.value || !! appeal.value.is_closed

const hasDisabledPreview = computed(() => ! form.value.channels.length || ! form.value.comment)

const hasDisabledChannelsChoice = computed(() => appeal.value?.is_published === true)

const hasTakeToWork = ref(false)

const resolveAppealUrl = (url: string) => {
    return url.replace(':id', params.id)
}

const takeToWork = () => {
    hasTakeToWork.value = true

    axios.post(resolveAppealUrl(API_APPEALS_START_WORK))
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

    axios.post(resolveAppealUrl(API_APPEALS_PUBLISH), form.value)
        .then((response: any) => {
            toast.success(trans('The appeal was successfully submitted to the queue for publication.'))

            appeal.value = response.data
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

.status {
    &__fill-width {
        width: 100%;
    }

    &__actions {
        flex: none;
    }
}

.scrollable {
    max-height: calc(100vh - 64px - 96px - 73px - 65px);
    overflow-y: auto;
}
</style>
