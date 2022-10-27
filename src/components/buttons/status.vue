<template>
    <v-chip :color="color(status)" label>
        {{ $t(title(status)) }}
    </v-chip>
</template>

<script lang="ts" setup>
import { color, title } from '@/helpers/statuses'

defineProps<{
    status: string
}>()
</script>
