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

        <v-footer-box />
    </v-layout>
</template>

<script lang="ts" setup>
import VFooterBox from '@/components/footer.vue'

import {computed, ref} from "vue";
import {useStore} from "vuex";

import {APPLICATION_TITLE} from "@/constants/meta";

const {getters} = useStore()

const appName = ref(APPLICATION_TITLE)

const pageName = computed(() => getters['meta/getPageTitle'])

const hasShowPageTitle = computed(() => {
    const title = getters['meta/getPageTitle']

    return title !== null && title !== appName
})
</script>
