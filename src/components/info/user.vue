<template>
    <v-list>
        <v-list-item
            v-if="isMe"
            :prepend-avatar="user.avatar"
            :title="$t('You')"
        />
        <v-list-item
            v-else
            :prepend-avatar="user.avatar"
            :subtitle="`@${user.username}`"
            :title="user.name"
        />
    </v-list>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const props = defineProps<{
    user: User,
    allowMe?: boolean
}>()

const userStore = useUserStore()?.user

const isMe = computed(() => props.allowMe && userStore?.id === props.user.id)
</script>
