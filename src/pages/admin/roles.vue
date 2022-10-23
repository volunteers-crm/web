<template>
    <v-container>
        <v-table fixed-header>
            <thead>
            <tr>
                <th v-text="$t('ID')" />
                <th v-text="$t('Role')" />
                <th v-text="$t('Is Storage')" />
                <th v-text="$t('Actions')" />
            </tr>
            </thead>
            <tbody>
            <tr v-for="(role, index) in roles">
                <td v-text="role.id" />
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
                    <v-dialog
                        v-model="dialogs.edit.show[role.id]"
                        persistent
                    >
                        <template v-slot:activator="{ props }">
                            <v-btn
                                color="blue darken-2"
                                icon="mdi-pencil"
                                v-bind="props"
                                variant="text"
                                @click="updatingRole(index)"
                            />
                        </template>

                        <v-card>
                            <v-card-title>
                                {{ $t('Edit Role') }}: {{ role.title }}
                            </v-card-title>

                            <v-card-text>
                                <v-text-field
                                    v-model="dialogs.edit.form.title"
                                    :label="$t('Role')"
                                    required
                                    hide-details
                                    autofocus
                                >
                                    <template v-slot:append>
                                        <v-checkbox
                                            v-model="dialogs.edit.form.is_storage"
                                            color="primary"
                                            hide-details
                                        >
                                            <v-tooltip
                                                activator="parent"
                                                location="top"
                                            >
                                                {{ $t('Is storage') }}
                                            </v-tooltip>
                                        </v-checkbox>
                                    </template>
                                </v-text-field>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer />

                                <v-btn
                                    :disabled="loading"
                                    :loading="loading"
                                    color="blue darken-2"
                                    @click="updateRole(index)"
                                >
                                    {{ $t('Update') }}
                                </v-btn>

                                <v-btn
                                    :disabled="loading"
                                    @click="dialogs.edit.show[role.id] = false"
                                    v-text="$t('Cancel')"
                                />
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

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
                                    :disabled="loading"
                                    :loading="loading"
                                    color="red darken-2"
                                    @click="deleteRole(role.id)"
                                >
                                    {{ $t('Agree') }}
                                </v-btn>

                                <v-btn
                                    :disabled="loading"
                                    @click="dialogs.delete.show[role.id] = false"
                                    v-text="$t('Cancel')"
                                />
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </td>
            </tr>
            <tr>
                <td />
                <td>
                    <v-text-field
                        v-model="form.title"
                        :label="$t('Role')"
                        required
                        hide-details
                        autofocus
                        @keyup.enter="addRole"
                    />
                </td>
                <td>
                    <v-checkbox
                        v-model="form.is_storage"
                        color="primary"
                        hide-details
                    >
                        <v-tooltip
                            activator="parent"
                            location="top"
                        >
                            {{ $t('Is storage') }}
                        </v-tooltip>
                    </v-checkbox>
                </td>
                <td>
                    <v-btn
                        color="primary"
                        @click="addRole"
                    >
                        {{ $t('Create') }}
                    </v-btn>
                </td>
            </tr>
            </tbody>
        </v-table>
    </v-container>
</template>

<script lang="ts" setup>
import { API_ROLES_INDEX, API_ROLES_SHOW } from '@/constants/api_routes'

import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import _ from 'lodash'

const roles = ref([])

const form = ref({
    title: '',
    is_storage: false
})

const dialogs = ref({
    delete: {
        show: []
    },
    edit: {
        show: [],
        form: {
            title: '',
            is_storage: false
        }
    }
})

const loading = ref(false)

onBeforeMount(() => axios.get(API_ROLES_INDEX).then((response: any) => roles.value = response.data))

const addRole = () => {
    loading.value = true

    axios.post(API_ROLES_INDEX, form.value)
        .then((response: any) => roles.value.push(response.data))
        .then(() => form.value.title = '')
        .finally(() => loading.value = false)
}

const updatingRole = (index: number) => {
    const values = roles.value[index]

    dialogs.value.edit.form = { ...values }
}

const updateRole = (index: number) => {
    loading.value = true

    const role = roles.value[index]

    axios.put(API_ROLES_SHOW.replace(':id', role.id), dialogs.value.edit.form)
        .then((response: any) => roles.value[index] = response.data)
        .then(() => dialogs.value.edit.show[role.id] = false)
        .finally(() => loading.value = false)
}

const deleteRole = (id: number) => {
    loading.value = true

    axios.delete(API_ROLES_SHOW.replace(':id', String(id)))
        .then(() => dialogs.value.delete.show[id] = false)
        .then(() => roles.value = _.reject(roles.value, (role: any) => role.id === id))
        .finally(() => {
            _.reject(dialogs.value.delete.show, (dialogId: number) => dialogId === id)

            loading.value = false
        })
}
</script>
