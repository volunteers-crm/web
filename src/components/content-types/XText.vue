<template>
    {{ content.text }}
</template>

<script lang="ts" setup>
defineProps<{
    content: TextMessageType
}>()
</script>
