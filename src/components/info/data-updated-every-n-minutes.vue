<template>
    <div
        class="text-right text-grey-darken-1"
        v-text="$t('The data is updated every :minutes minutes.', { minutes })"
    />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useSettingsStore } from '@/store'

const settingsStore = useSettingsStore()

const minutes = ref(settingsStore.timeoutAdminDashboard)
</script>
