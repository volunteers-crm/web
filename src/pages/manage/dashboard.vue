<template>
    <v-row>
        <v-col>
            <issues-chart />
        </v-col>
        <v-col>
            <curators-chart />
        </v-col>
    </v-row>

    <v-row>
        <v-col>
            <storage-chart />
        </v-col>
        <v-col>
1
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import IssuesChart from '@/components/charts/issues.vue'
import CuratorsChart from '@/components/charts/curators.vue'
import StorageChart from '@/components/charts/storage.vue'</script>
