<template>
    <v-layout>
        <v-app-bar app prominent>
            <v-container>
                <v-app-bar-title>
                    {{ appName }}
                </v-app-bar-title>
            </v-container>
        </v-app-bar>

        <v-main>
            <slot />
        </v-main>

        <v-footer app class="bg-grey-lighten-1" color="primary">
            <v-row justify="center" no-gutters>
                <router-link
                    v-for="route in routes"
                    :key="route.name"
                    :to="{ name: route.name}"
                >
                    <v-btn
                        class="mx-2"
                        color="white"
                        variant="text"
                        v-text="route.title"
                    />
                </router-link>

                <v-col
                    class="text-center text-white mt-4"
                    cols="12"
                >
                    {{ year }} — {{ appName }}
                </v-col>
            </v-row>
        </v-footer>
    </v-layout>
</template>

<script setup lang="ts">
import {ref} from "vue";

import {APPLICATION_TITLE} from "@/constants/meta";

import routes from '@/plugins/menu'

const appName = ref(APPLICATION_TITLE)

const year = ref(new Date().getFullYear())
</script>
