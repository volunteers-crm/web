<template>
    <v-container>
        <v-card>
            <v-tabs
                v-model="tab"
                bg-color="primary"
                align-tabs="title"
                density="comfortable"
            >
                <v-tab value="new" v-text="$t('New')" />
                <v-tab value="accepted" v-text="$t('Accepted')" />
                <v-tab value="declined" v-text="$t('Declined')" />
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="new">
                        <v-becomes :url="API_BECOMES_NEW" />
                    </v-window-item>

                    <v-window-item value="accepted">
                        <v-becomes :url="API_BECOMES_ACCEPTED" updated />
                    </v-window-item>

                    <v-window-item value="declined">
                        <v-becomes :url="API_BECOMES_DECLINED" updated />
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
