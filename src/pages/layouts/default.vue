<template>
    <v-app-bar app>
        This is a application bar
    </v-app-bar>

    <header>
        Default Template
    </header>

    <v-main>
        <slot />
    </v-main>

    <v-footer app class="bg-grey-lighten-1">
        <v-row justify="center" no-gutters>
            <v-btn
                v-for="link in menu"
                :key="link"
                color="white"
                variant="text"
                class="mx-2"
                rounded="xl"
                v-text="link"
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

<script setup lang="ts">
import {ref} from "vue";
import {APPLICATION_TITLE} from "@/constants/meta";

const appName = ref(APPLICATION_TITLE)

const year = ref(new Date().getFullYear())

const menu = ref([
    'Home',
    'About Us',
    'Team',
    'Services',
    'Blog',
    'Contact Us',
])
</script>
