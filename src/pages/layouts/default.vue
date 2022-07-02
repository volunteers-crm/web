<template>
    <v-layout>
        <v-app-bar app prominent>
            <v-container>
                <v-app-bar-title>
                    {{ appName }}

                    <div
                        v-if="hasShowPageTitle"
                        class="text-grey-darken-3 font-weight-light d-inline"
                    >
                        <span class="mx-3">|</span>
                        <span class="text-body-1" v-text="pageName" />
                    </div>
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

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";

import {APPLICATION_TITLE} from "@/constants/meta";
import routes from '@/plugins/menu'

const {getters} = useStore()

const appName = ref(APPLICATION_TITLE)

const year = ref(new Date().getFullYear())

const pageName = computed(() => getters['meta/getPageTitle'])

const hasShowPageTitle = computed(() => {
    const title = getters['meta/getPageTitle']

    return title !== null && title !== appName
})
</script>
