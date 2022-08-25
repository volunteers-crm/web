<template>
    {{ content.src }}
</template>

<script lang="ts" setup>
defineProps<{
    content: MediaMessageType
}>()
</script>
