<template>
    <v-list nav>
        <v-list-item
            v-for="route in manages"
            :key="getName(route)"
            :prepend-icon="route.meta.icon"
            :title="$t(route.meta.title)"
            :to="{ name: getName(route) }"
        />
    </v-list>
</template>

<script lang="ts" setup>
import { ROUTE_ADMIN_DASHBOARD } from '@/routes/names'

import { manages } from '@/helpers/menu'
import { collect } from '@/helpers/collection'

const getName = (route: any) => {
    if (route?.name) {
        return route.name
    }

    if (route?.children) {
        return collect(route.children).find((item: any) => item.path === '' && item?.name).name
    }

    return ROUTE_ADMIN_DASHBOARD
}
</script>
