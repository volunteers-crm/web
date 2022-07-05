<template>
    <v-row>
        <v-col>
            <issues-chart />
        </v-col>
        <v-col>
            <coordinators-chart />
        </v-col>
    </v-row>

    <v-row>
        <v-col>
            <storage-chart />
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import IssuesChart from '@/components/charts/issues.vue'
import CoordinatorsChart from '@/components/charts/coordinators.vue'
import StorageChart from '@/components/charts/storage.vue'</script>
