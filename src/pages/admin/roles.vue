<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-btn color="primary">
                    {{ $t('Add roles') }}

                    <v-dialog v-model="dialogs.add.show" activator="parent" persistent>
                        <v-form
                            :ref="dialogs.add.ref"
                            :disabled="dialogs.add.loading"
                            @submit.prevent="addRoles"
                        >
                            <v-card>
                                <v-card-title>
                                    {{ $t('Add role') }}
                                </v-card-title>

                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-role-category
                                                v-model="dialogs.add.form.category"
                                                required
                                            />
                                        </v-col>
                                    </v-row>

                                    <v-row class="card__box">
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
                                        {{ $t('Add') }}
                                    </v-btn>

                                    <v-btn
                                        :disabled="dialogs.add.loading"
                                        @click="dialogs.add.show = false"
                                    >
                                        {{ $t('Cancel') }}
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

                    <v-dialog
                        v-model="dialogs.delete.show[role.id]"
                        persistent
                    >
                        <template v-slot:activator="{ props }">
                            <v-btn
                                color="red darken-2"
                                icon="mdi-delete"
                                v-bind="props"
                                variant="text"
                            />
                        </template>

                        <v-card>
                            <v-card-title>
                                {{ $t('Confirm') }}
                            </v-card-title>

                            <v-card-text>
                                <p
                                    v-html="$t('Are you sure you want to delete <strong>:title</strong> role?', role)"
                                />
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer />

                                <v-btn
                                    :disabled="dialogs.delete.loading"
                                    :loading="dialogs.delete.loading"
                                    color="red darken-2"
                                    @click="deleteRole(role.id)"
                                >
                                    {{ $t('Agree') }}
                                </v-btn>

                                <v-btn
                                    :disabled="dialogs.delete.loading"
                                    @click="dialogs.delete.show[role.id] = false"
                                    v-text="$t('Cancel')"
                                />
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </td>
            </tr>
            </tbody>
        </v-table>
    </v-container>
</template>

<script lang="ts" setup>
import VRoleCategory from '@/components/lists/role-category.vue'
import VRoles from '@/components/lists/roles.vue'

import { API_ROLES_INDEX, API_ROLES_SHOW } from '@/constants/api_routes'

import { computed, onBeforeMount, ref } from 'vue'
import axios from 'axios'
import _ from 'lodash'

const roles = ref([])

const dialogs = ref({
    add: {
        ref: 'addRoleDialog',
        show: true,
        loading: false,

        form: {
            category: null,
            roles: []
        }
    },
    delete: {
        show: [],

        loading: false
    },
    roles: []
})

onBeforeMount(() => axios.get(API_ROLES_INDEX).then((response: any) => roles.value = response.data))

const canStorageRoles = computed(() => dialogs.value.add.form.category?.can_storage || false)

const addRoles = () => {
    dialogs.value.add.loading = true

    axios.post(API_ROLES_INDEX, {
        category_id: dialogs.value.add.form.category?.id,
        roles: dialogs.value.add.form.roles.filter(role => !! role?.title)
    })
        .then((response: any) => {

            dialogs.value.add.show = false
        })
        .finally(() => dialogs.value.add.loading = false)
}

const deleteRole = (id: number) => {
    dialogs.value.delete.loading = true

    axios.delete(API_ROLES_SHOW.replace(':id', String(id)))
        .then(() => _.reject(roles, (role: any) => role.id === id))
        .finally(() => {
            dialogs.value.delete.loading = false

            _.reject(dialogs.value.delete.show, (dialogId: number) => dialogId === id)
        })
}
</script>

<style lang="scss" scoped>
.card__box {
    max-height: 70vh;
    overflow-y: auto;
}
</style>
