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
import {ref} from "vue";

import {getLocale, setLocale} from "@/plugins/locale";
import {useRouter} from "vue-router";

const router = useRouter()

const locales = ref({
    en: 'English',
    de: 'Deutsch',
    ru: 'Русский'
})

const setSelectedLocale = (locale: string) => {
    if (locale === getLocale()) {
        return
    }

    setLocale(locale, true)
}

const current = ref(getLocale())
</script>
