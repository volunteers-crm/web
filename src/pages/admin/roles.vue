<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-btn color="primary">
                    {{ $t("Add roles") }}

                    <v-dialog v-model="dialogs.add.show" activator="parent" persistent>
                        <v-form
                            :ref="dialogs.add.ref"
                            :disabled="dialogs.add.loading"
                            @submit.prevent="addRoles"
                        >
                            <v-card>
                                <v-card-title>
                                    {{ $t("Add role") }}
                                </v-card-title>

                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-role-category
                                                v-model="dialogs.add.form.category"
                                                required
                                            />
                                        </v-col>

                                        <v-col cols="12">
                                            <v-roles
                                                v-model="dialogs.add.form.roles"
                                                :can-storage="canStorageRoles"
                                                :disabled="dialogs.add.loading"
                                                :label="$t('Role')"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer />

                                    <v-btn
                                        :loading="dialogs.add.loading"
                                        color="primary"
                                        type="submit"
                                    >
                                        {{ $t("Add") }}
                                    </v-btn>

                                    <v-btn
                                        :disabled="dialogs.add.loading"
                                        @click="dialogs.add.show = false"
                                    >
                                        {{ $t("Cancel") }}
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </v-dialog>
                </v-btn>
            </v-col>
        </v-row>

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
import VRoleCategory from '@/components/lists/role-category.vue'
import VRoles from '@/components/lists/roles.vue'

import { API_ROLES_INDEX } from '@/constants/api_routes'

import { roles } from '@/_fakes/roles'

import { computed, ref } from 'vue'
import axios from 'axios'

const dialogs = ref({
    add: {
        ref: 'addRoleDialog',
        show: true,
        loading: false,

        form: {
            category: null,
            roles: []
        }
    }
})

const canStorageRoles = computed(() => dialogs.value.add.form.category?.can_storage || false)

const addRoles = () => {
    dialogs.value.add.loading = true

    axios.post(API_ROLES_INDEX, {
        category_id: dialogs.value.add.form.category?.id,
        roles: dialogs.value.add.form.roles.filter(role => !!role?.title)
    })
        .then((response: any) => {

            dialogs.value.add.show = false
        })
        .finally(() => dialogs.value.add.loading = false)
}
</script>