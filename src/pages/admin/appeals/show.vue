<template>
    <v-loader-page
        v-slot="{ props }"
        :fake="fake"
        :params="params"
        :title="title"
        :url="url"
        no-cache
    >
        <v-container class="fill-height py-0" fluid>
            <v-row class="fill-height" no-gutters>
                <v-col cols="2">
                    <v-list>
                        <v-list-item
                            :prepend-avatar="props.client.avatar"
                            :subtitle="`@${props.client.username}`"
                            :title="props.client.name"
                        />
                    </v-list>

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

                    <v-card elevation="0">
                        <v-card-title>
                            {{ $t('Curator') }}
                        </v-card-title>

                        <v-card-text v-if="!!props.curator">
                            <p v-if="isMe(props.curator.id)" v-text="$t('You')" />
                            <p v-else v-text="props.curator.name" />

                            <p class="text-grey" v-text="`@${props.curator.username}`" />
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
                            {{ $t('Bot') }}
                        </v-card-title>

                        <v-card-text>
                            <p v-text="props.bot.name" />
                            <p class="text-grey" v-text="`@${props.bot.username}`" />
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
                        </v-card-text>
                    </v-card>

                    <v-divider />

                    <v-card elevation="0">
                        <v-card-text>
                            <p class="date__info">
                                <span>{{ $t('Timezone') }}:</span>
                                {{ props.bot.timezone }}
                            </p>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="10">
                    <v-chat
                        :appeal-id="props.id"
                        :status="props.status"
                    />
                </v-col>
            </v-row>
        </v-container>
    </v-loader-page>
</template>

<script lang="ts" setup>
import VLoaderPage from '@/components/pages/loader.vue'
import VStatusBtn from '@/components/buttons/status.vue'
import VChat from '@/components/chats/chat.vue'

import { API_APPEALS_SHOW, API_APPEALS_START_WORK } from '@/constants/api_routes'

import { dateFormat } from '@/helpers/date'
import { findAppeal } from '@/_fakes/appeals'

import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

const { meta, params } = useRoute()
const userStore = useUserStore()

const url = ref(API_APPEALS_SHOW)

const title = ref(meta.title)

const formatDate = (date: string) => dateFormat(date)

const fake = computed(() => findAppeal(Number(params.id)))

const isMe = (id: number) => id === userStore.user.id

const hasTakeToWork = ref(false)

const takeToWork = () => {
    hasTakeToWork.value = true

    axios.post(API_APPEALS_START_WORK)
        .then(response => console.log('success started!'))
        .finally(() => hasTakeToWork.value = false)
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
</style>
