<template>
    {{ content }}
</template>

<script lang="ts" setup>
defineProps<{
    content: string | number
}>()
</script>
