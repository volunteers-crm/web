<template>
    <v-footer app class="bg-grey-lighten-1" color="primary">
        <v-row justify="center" no-gutters>
            <v-btn
                v-for="route in routes"
                :key="route.name"
                :to="{ name: route.name }"
                class="mx-2"
                variant="text"
                v-text="route.title"
            />

            <v-col
                class="text-center text-white mt-4"
                cols="12"
            >
                {{ year }} — {{ appName }}
            </v-col>
        </v-row>
    </v-footer>
</template>

<script lang="ts" setup>
import {APPLICATION_TITLE} from "@/constants/meta";

import routes from '@/plugins/menu'

import {ref} from "vue";

const year = ref(new Date().getFullYear())

const appName = ref(APPLICATION_TITLE)
</script>
