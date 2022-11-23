<template>
    <v-list>
        <v-list-item
            :prepend-avatar="avatar"
            :title="content.name"
            :subtitle="content.phone"
        />
    </v-list>
</template>

<script lang="ts" setup>
import avatar from '@/assets/images/avatar.png'

defineProps<{
    content: ContactMessageType
}>()
</script>
