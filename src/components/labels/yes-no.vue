<template>
    <span
        v-if="is"
        v-text="$t('Yes')"
        class="text-green"
    />

    <span
        v-else
        v-text="$t('No')"
        class="text-red"
    />
</template>

<script lang="ts" setup>
defineProps<{
    is: boolean
}>()
</script>
