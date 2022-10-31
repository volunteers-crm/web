<template>
    <div>
        <v-chip
            v-for="role in roles"
            class="ma-1"
            color="primary"
        >
            {{ role.title }}

            <v-icon
                v-if="role.is_storage"
                class="ml-2 text-grey-darken-3"
            >
                mdi-package-variant
            </v-icon>

            <v-tooltip
                v-if="role.is_storage"
                activator="parent"
                location="top"
            >
                {{ $t('Is storage') }}
            </v-tooltip>
        </v-chip>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    roles: Role[]
}>()
</script>
