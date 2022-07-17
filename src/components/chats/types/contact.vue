<template>
    <p v-text="content.name" />

    <p
        class="mt-2"
        v-text="content.phone"
    />
</template>

<script lang="ts" setup>
defineProps<{
    content: ContactMessageType
}>()
</script>
