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
            <v-btn
                :to="{name: ROUTE_ADMIN_DASHBOARD}"
                variant="text"
                v-text="$t('Admin')"
            />

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

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { APPLICATION_TITLE } from '@/constants/meta'
import { ROUTE_MAIN } from '@/routes/names'
import { useMetaStore } from '@/store'

const router = useRouter()
const metaStore = useMetaStore()

const appName = ref(APPLICATION_TITLE)

const pageName = computed(() => metaStore.pageTitle)

const hasShowPageTitle = computed(() => pageName.value !== appName.value)

const goToMain = () => router.push({ name: ROUTE_MAIN })
</script>

<style lang="scss" scoped>
.link-cursor {
    cursor: pointer;
}
</style>
