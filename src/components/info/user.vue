<template>
    <v-list>
        <v-list-item
            :prepend-avatar="avatar"
            :subtitle="`@${username}`"
            :title="name"
        />
    </v-list>
</template>

<script lang="ts" setup>
defineProps<{
    name: string,
    username: string,
    avatar: string
}>()
</script>
