<template>
    <v-list>
        <v-list-item
            :prepend-avatar="user.avatar"
            :subtitle="`@${user.username}`"
            :title="title"
        />
    </v-list>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import { trans } from '@/utils/lang'

const props = defineProps<{
    user: User,
    allowMe?: boolean
}>()

const userStore = useUserStore()

const title = computed(() => props.allowMe && isMe(props.user.id) ? trans('You') : props.user.name)

const isMe = (id: number) => id === userStore.id
</script>
