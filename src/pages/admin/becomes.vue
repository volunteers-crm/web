<template>
    <v-container>
        <v-card>
            <v-tabs
                v-model="tab"
                bg-color="primary"
            >
                <v-tab value="new">{{ $t('New') }}</v-tab>
                <v-tab value="accepted">{{ $t('Accepted') }}</v-tab>
                <v-tab value="declined">{{ $t('Declined') }}</v-tab>
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="new">
                        <v-becomes :url="API_BECOMES_NEW" accept decline />
                    </v-window-item>

                    <v-window-item value="accepted">
                        <v-becomes :url="API_BECOMES_ACCEPTED" updated decline />
                    </v-window-item>

                    <v-window-item value="declined">
                        <v-becomes :url="API_BECOMES_DECLINED" updated accept />
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts" setup>
import VBecomes from '@/components/tables/becomes.vue'

import { API_BECOMES_ACCEPTED, API_BECOMES_DECLINED, API_BECOMES_NEW } from '@/constants/api_routes'

import { ref } from 'vue'

const tab = ref()
</script>
