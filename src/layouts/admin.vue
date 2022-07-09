<template>
    <v-navigation-drawer :rail="navigation" app permanent>
        <v-list>
            <v-list-item
                :prepend-avatar="user.avatar"
                :subtitle="`@${user.username}`"
                :title="user.name"
            >
                <template v-if="!navigation" v-slot:append>
                    <v-list-item-avatar end>
                        <v-btn
                            icon="mdi-exit-to-app"
                            size="small"
                            variant="text"
                            @click="logout"
                        />
                    </v-list-item-avatar>
                </template>
            </v-list-item>
        </v-list>

        <v-divider />

        <v-admin-menu />
    </v-navigation-drawer>

    <v-app-bar app elevation="1" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="navigationToggle" />

        <v-app-bar-title>
            {{ pageName || appName }}
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
import VAdminMenu from '@/components/menu/admin.vue'

import { computed, ref } from 'vue'

import { APPLICATION_TITLE } from '@/constants/meta'

import { logout } from '@/helpers/user'
import { useMetaStore } from '@/stores/meta'
import { useUserStore } from '@/stores/user'
import { useSettingsStore } from '@/stores/settings'

const metaStore = useMetaStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()

const appName = ref(APPLICATION_TITLE)

const pageName = computed(() => metaStore.pageTitle)

const user = computed(() => userStore.user)

const navigation = computed(() => settingsStore.menu.rail)

const navigationToggle = () => settingsStore.toggleMenuRail()
</script>
