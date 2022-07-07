<template>
    <span v-if="me && itsMe()" class="text-green">{{ $t('Me') }}</span>
    <span v-else v-text="name" />

    <div class="telegram__link">
        (
        <span v-if="text" v-text="`@${username}`" />
        <span v-else v-html="telegram(username)" />
        )
    </div>
</template>

<script lang="ts" setup>
import { telegram } from '@/plugins/links'

import { ref } from 'vue'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const props = defineProps<{
    id: number,
    username?: string | number | null,
    name: string,
    me?: boolean,
    text?: boolean
}>()

const currentUserId = ref(userStore.get.id)

const itsMe = (): boolean => currentUserId.value === props.id
</script>

<style lang="scss">
.telegram__link {
    color: darkgrey;
    display: inline;

    span, a {
        color: darkgrey;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
}
</style>
