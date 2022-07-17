<template>
    <vue3-video-player
        :src="content.src"
    />
</template>

<script lang="ts" setup>
defineProps<{
    content: MediaMessageType
}>()
</script>
