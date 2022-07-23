<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                variant="text"
                v-text="current"
            />
        </template>

        <v-list>
            <v-list-item
                v-for="(title, locale) in locales"
                :key="locale"
                :value="locale"
                @click="setSelectedLocale(locale)"
            >
                <v-list-item-title>
                    {{ title }}
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { locales } from '@/constants/locales'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()

const current = ref(settingsStore.locale)

const setSelectedLocale = (locale: string) => {
    if (locale !== current.value) {
        settingsStore.setLocale(locale)

        window.location.reload()
    }
}
</script>
