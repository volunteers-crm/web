<template>
    <span v-if="me && itsMe()" class="text-green">{{ $t('Me') }}</span>
    <span v-else v-text="name" />

    <div class="telegram__link">
        ( <span v-html="telegram(username)" /> )
    </div>
</template>

<script lang="ts" setup>
import {telegram} from "@/plugins/links";

import {useStore} from "vuex";
import {ref} from "vue";

const store = useStore()

const props = defineProps<{
    id: number,
    username?: string | number | null,
    name: string,
    me?: boolean
}>()

const currentUserId = ref(store.getters['user/getUser'].id)

const itsMe = (): boolean => currentUserId.value === props.id
</script>

<style lang="scss">
.telegram__link {
    display: inline;
    color: darkgrey;

    span, a {
        text-decoration: none;
        color: darkgrey;
    }

    a:hover {
        text-decoration: underline;
    }
}
</style>
