<template>
    <v-loader-page
        v-slot="{ props }"
        :fake="fake"
        :params="params"
        :title="title"
        :url="url"
        no-cache
    >
        <v-container fluid>
            <v-row no-gutters>
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
                            <p v-text="props.curator.name" />
                            <p class="text-grey" v-text="`@${props.curator.username}`" />
                        </v-card-text>

                        <v-card-text v-else class="text-red">
                            {{ $t('Curator not appointed') }}
                        </v-card-text>
                    </v-card>

                    <v-divider />

                    <v-card elevation="0">
                        <v-card-title>
                            {{ $t('Chat') }}
                        </v-card-title>

                        <v-card-text>
                            <p v-text="props.chat.name" />
                            <p class="text-grey" v-text="`@${props.chat.username}`" />
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
                </v-col>

                <v-col cols="10">
                    messages will be here
                </v-col>
            </v-row>
        </v-container>
    </v-loader-page>
</template>

<script lang="ts" setup>
import VLoaderPage from '@/components/pages/loader.vue'
import VStatusBtn from '@/components/buttons/status.vue'

import { API_ISSUES_SHOW } from '@/constants/api_routes'

import { findIssue } from '@/_fakes/issues'

import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import moment from 'moment'

const { meta, params } = useRoute()

const url = ref(API_ISSUES_SHOW)

const title = ref(meta.title)

const formatDate = (date: string) => {
    return moment(date).format('LLL')
}

const fake = computed(() => findIssue(Number(params.id)))
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
