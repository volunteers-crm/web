<template>
    <v-container>
        <v-row>
            <v-col>
                <appeals-chart />
            </v-col>
            <v-col>
                <coordinators-chart />
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <storage-chart />
            </v-col>
            <v-col>
                <roles-chart />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import AppealsChart from '@/components/charts/appeals.vue'
import CoordinatorsChart from '@/components/charts/coordinators.vue'
import StorageChart from '@/components/charts/storage.vue'
import RolesChart from '@/components/charts/roles.vue'</script>
