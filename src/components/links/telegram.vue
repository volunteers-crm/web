<template>
    <span v-if="me && itsMe()" class="text-green" v-text="$t('You')" />
    <div v-else>
        <span v-text="name" />

        <div class="telegram__link">
            (
            <span v-if="text" v-text="`@${username}`" />
            <span v-else v-html="telegram(username)" />
            )
        </div>
    </div>
</template>

<script lang="ts" setup>
import { telegram } from '@/helpers/links'
import { useUserStore } from '@/stores/user'

import { ref } from 'vue'

const userStore = useUserStore()?.user

const props = withDefaults(
    defineProps<{
        id: number,
        username?: string | number | null,
        name: string,
        me?: boolean,
        text?: boolean
    }>(),
    {
        username: null,
        me: false,
        text: false
    }
)

const currentUserId = ref(userStore?.id)

const itsMe = (): boolean => currentUserId.value === props.id
</script>

<style lang="scss" scoped>
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
