<template>
    <v-img
        :src="content"
        max-height="200"
    />
</template>

<script lang="ts" setup>
defineProps<{
    content: string | number
}>()
</script>
