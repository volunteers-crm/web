<template>
    <p>map</p>
    <p>Lon: {{ content.longitude }}</p>
    <p>Lat: {{ content.latitude }}</p>
</template>

<script lang="ts" setup>
defineProps<{
    content: LocationMessageType
}>()
</script>
