<template>
    <v-chip :color="color(status)" label>
        {{ $t(status) }}
    </v-chip>
</template>

<script lang="ts" setup>
import { color } from '@/helpers/status-color'

defineProps<{
    status: string
}>()
</script>
