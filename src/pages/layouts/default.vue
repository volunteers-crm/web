<template>
    <v-app-bar app elevation="0" prominent>
        <v-app-bar-title>
                <span class="link-cursor" @click="goToMain">
                    {{ appName }}
                </span>

            <div
                v-if="hasShowPageTitle"
                class="text-grey-darken-3 font-weight-light d-inline"
            >
                <span class="mx-3">|</span>
                <span class="text-body-1" v-text="pageName" />
            </div>
        </v-app-bar-title>

        <template v-slot:append>
            <v-locale />
        </template>
    </v-app-bar>

    <v-main>
        <slot />
    </v-main>

    <v-footer-box />
</template>

<script lang="ts" setup>
import VFooterBox from '@/components/footer.vue'
import VLocale from '@/components/locale.vue'

import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";


import {APPLICATION_TITLE} from "@/constants/meta";
import {ROUTE_MAIN} from "@/routes/names";

const router = useRouter()
const store = useStore()

const appName = ref(APPLICATION_TITLE)

const pageName = computed(() => store.getters['meta/getPageTitle'])

const hasShowPageTitle = computed(() => {
    const title = store.getters['meta/getPageTitle']

    return title !== null && title !== appName
})

const goToMain = () => router.push({name: ROUTE_MAIN})
</script>

<style lang="scss" scoped>
.link-cursor {
    cursor: pointer;
}
</style>
