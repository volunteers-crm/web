<template>
    <v-container>
        <v-table>
            <thead>
            <tr>
                <th v-text="$t('ID')" />
                <th v-text="$t('Category')" />
                <th v-text="$t('Role')" />
                <th v-text="$t('Is Storage')" />
                <th v-text="$t('Actions')" />
            </tr>
            </thead>
            <tbody>
            <tr v-for="role in roles">
                <td v-text="role.id" />
                <td v-text="role.category.title" />
                <td v-text="role.title" />

                <td>
                    <v-checkbox
                        v-model="role.is_storage"
                        color="primary"
                        disabled
                        hide-details
                    />
                </td>

                <td>
                    edit
                    delete
                </td>
            </tr>
            </tbody>
        </v-table>
    </v-container>
</template>

<script lang="ts" setup>
import { roles } from '@/_fakes/roles'</script>
