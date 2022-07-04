<template>
    <v-navigation-drawer v-model="navigation" app permanent>
        <v-list>
            <v-list-item
                :prepend-avatar="logo"
                :title="appName"
                subtitle="work in progress"
            />
        </v-list>

        <v-divider />

        <v-list nav>
            <v-list-item
                v-for="route in manages"
                :key="route.name"
                :prepend-icon="route.meta.icon"
                :title="route.meta.title"
                :to="{ name: route.name }"
            />
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app elevation="1" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="navigation = !navigation" />

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

        <v-spacer />

        <v-btn icon="mdi-magnify" variant="text"></v-btn>
    </v-app-bar>

    <v-main>
        <slot />
    </v-main>

    <v-footer-box />
</template>

<script lang="ts" setup>
import VFooterBox from '@/components/footer.vue'

import logo from '@/assets/logotype.svg'

import {computed, ref} from "vue";
import {useStore} from "vuex";

import {APPLICATION_TITLE} from "@/constants/meta";
import {manages} from "@/plugins/menu";

const {getters} = useStore()

const appName = ref(APPLICATION_TITLE)

const pageName = computed(() => getters['meta/getPageTitle'])

const hasShowPageTitle = computed(() => {
    const title = getters['meta/getPageTitle']

    return title !== null && title !== appName
})

const navigation = ref(true)
</script>
