<template>
    <v-img
        :lazy-src="content.preview"
        :src="content.src"
    />
</template>

<script lang="ts" setup>
defineProps<{
    content: MediaMessageType
}>()
</script>
