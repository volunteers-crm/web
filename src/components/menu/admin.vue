<template>
    <v-list nav>
        <v-list-item
            v-for="route in manages"
            :key="getName(route)"
            :active="isActive(route)"
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

import { useRoute } from 'vue-router'

import _ from 'lodash'

const route = useRoute()

const getName = (route: any): string => {
    if (route?.name) {
        return route.name
    }

    if (route?.children) {
        return collect(route.children).find((item: any) => item.path === '' && item?.name).name
    }

    return ROUTE_ADMIN_DASHBOARD
}

const isChild = (route: any, name: string): boolean => {
    if (route?.name === name) {
        return true
    }

    return !! _.find(route?.children || [], (child: any) => child?.name === name)
}

const isActive = (item: any) => {
    return isChild(item, String(route?.name))
}
</script>
