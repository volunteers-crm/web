<template>
    <v-container>
        <v-row>
            <v-col
                :md="colSize"
                cols="12"
            >
                <v-hover v-slot="{ isHovering, props }">
                    <v-card
                        :elevation="isHovering ? 4 : 1"
                        class="fill-height add-icon"
                        v-bind="props"
                    >
                        <v-card-text class="fill-height d-flex justify-center align-center">
                            <v-icon icon="mdi-plus" />
                        </v-card-text>

                        <v-dialog
                            v-model="cardCreate"
                            activator="parent"
                            persistent
                        >
                            <v-form
                                :ref="form.ref.add"
                                v-model="form.validate.add"
                                :disabled="cardLoading['add']"
                                lazy-validation
                            >
                                <v-card min-width="800px">
                                    <v-card-title v-text="$t('Add roles')" />

                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-select
                                                    v-model="form.data.category"
                                                    :items="categories"
                                                    :label="$t('Role categories')"
                                                    item-title="title"
                                                    item-value="id"
                                                    required
                                                    variant="underlined"
                                                />
                                            </v-col>

                                            <v-col cols="12">
                                                <v-roles
                                                    v-model="form.data.roles"
                                                    :can-storage="canStorageRoles"
                                                    :label="$t('Role')"
                                                    required
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer />

                                        <v-btn
                                            :disabled="cardLoading['add'] || !form.validate.add"
                                            :loading="cardLoading['add']"
                                            @click="addRoles"
                                        >
                                            {{ $t('Add') }}
                                        </v-btn>

                                        <v-btn
                                            :disabled="cardLoading['add']"
                                            @click="cardCreate = false"
                                            v-text="$t('Cancel')"
                                        />
                                    </v-card-actions>
                                </v-card>
                            </v-form>
                        </v-dialog>
                    </v-card>
                </v-hover>
            </v-col>

            <v-col
                v-for="(items, category) in roles"
                :md="colSize"
                cols="12"
            >
                <v-hover v-slot="{ isHovering, props }">
                    <v-card
                        v-if="!cardEdit[category] && !cardDelete[category]"
                        :elevation="isHovering ? 4 : 1"
                        :loading="cardLoading[category]"
                        class="fill-height d-flex flex-column"
                        v-bind="props"
                    >
                        <v-card-title v-text="category" />

                        <v-card-text>
                            <v-list :items="mappedRoles(items)" />
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer />

                            <v-btn
                                @click="cardEdit[category] = true"
                            >
                                {{ $t('Edit') }}
                            </v-btn>

                            <v-btn
                                class="text-red-darken-1"
                                @click="cardDelete[category] = true"
                            >
                                {{ $t('Delete') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card
                        v-if="cardEdit[category]"
                        class="card__reveal"
                    >
                        <v-card-title v-text="category" />

                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-roles
                                        v-model="roles[category]"
                                        :can-storage="canStorageableCategory(category)"
                                        :label="$t('Role')"
                                        required
                                    />
                                </v-col>
                            </v-row>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer />

                            <v-btn @click="updateRoles(items)">
                                {{ $t('Save') }}
                            </v-btn>

                            <v-btn @click="cardEdit[category] = false">
                                {{ $t('Cancel') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card
                        v-if="cardDelete[category]"
                        class="card__reveal"
                    >
                        <v-card-title>
                            You are sure?
                        </v-card-title>

                        <v-card-text>
                            Some text
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer />

                            <v-btn
                                class="text-green-darken-1"
                                @click="cardDelete[category] = false"
                            >
                                {{ $t('No') }}
                            </v-btn>

                            <v-btn
                                class="text-red"
                                @click="deleteRoles(items, category)"
                            >
                                {{ $t('Yes, delete') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import VRoles from '@/components/lists/roles.vue'

import { API_ROLES_INDEX } from '@/constants/api_routes'

import { computed, ref, watch } from 'vue'
import { trans } from 'laravel-vue-i18n'
import { useToast } from 'vue-toastification'

import _ from 'lodash'
import axios from 'axios'
import { roleCategories, rolesGroupByCategory } from '@/_fakes/roles'

const cardCreate = ref(false)
const cardEdit = ref({})
const cardDelete = ref({})
const cardLoading = ref({})

const categories = ref(roleCategories)

const roles = ref(rolesGroupByCategory)

const form = ref({
    ref: {
        add: 'add-form'
    },

    validate: {
        add: false
    },

    data: {
        category: null,
        roles: []
    }
})

const colSize = computed(() => {
    const size = roles.value.length + 1

    const sizes = {
        1: 3,
        2: 6,
        3: 4
    }

    return _.get(sizes, size, 3)
})

const toast = useToast()

const canStorageRoles = computed(() => {
    const category = _.find(categories.value, (category: RoleCategory) => category.id === form.value.data.category)

    return category?.can_storage
})

const canStorageableCategory = (title: string) => {
    const category = _.find(categories.value, (category: RoleCategory) => category.title === title)

    return category?.can_storage
}

const mappedRoles = (items: Role[]) => {
    return _.map(items, (item: Role) => {
        if (item.is_storage) {
            return {
                id: item.id,
                title: item.title,
                props: {
                    appendIcon: 'mdi-package-variant'
                }
            }
        }

        return item
    })
}

watch(
    () => cardCreate.value,
    (val: boolean) => val && resetForm()
)

watch(
    () => cardEdit.value,
    (val: object) => !! _.filter(val, (item: boolean) => item) && resetForm()
)

watch(
    () => cardDelete.value,
    (val: object) => !! _.filter(val, (item: boolean) => item) && resetForm()
)

const resetForm = () => {
    form.value.data.category = null
    form.value.data.roles = []
}

const addRoles = () => {
    // validate form

    _.set(cardLoading.value, 'add', true)

    axios.post(API_ROLES_INDEX, form.value.data)
        .then((response: any) => {
            toast.success(trans('Roles have been successfully added to your account.', {
                name: response.data.name
            }))

            cardCreate.value = false
        })
        .finally(() => _.set(cardLoading.value, 'add', false))
}

const updateRoles = (items: Role[], category: string) => {
    _.set(cardLoading.value, category, true)

    axios.put(API_ROLES_INDEX, items)
        .then(() => {
            toast.success(trans('Roles updated successfully.'))

            _.set(cardEdit.value, category, false)
        })
        .finally(() => _.set(cardLoading.value, category, false))
}

const deleteRoles = (items: Role[], category: string) => {
    _.set(cardLoading.value, category, true)

    const ids: number[] = _.map(items, (item: Role) => item.id)

    axios.delete(API_ROLES_INDEX, { params: { roles: ids } })
        .then(() => {
            _.reject(roles, (val, key) => key === category)

            toast.success(trans('Roles have been removed from your account and unlinked from all bots.'))

            _.set(cardDelete.value, category, false)
        })
        .finally(() => _.set(cardLoading.value, category, false))
}
</script>

<style lang="scss" scoped>
.add-icon {
    cursor: pointer;

    i {
        &.v-icon {
            caret-color: #9E9E9E !important;
            color: #9E9E9E !important;
            font-size: calc(var(--v-icon-size-multiplier) * 5em);
        }
    }
}

.card {
    &__reveal {

    }
}

.hint {
    color: grey;
    font-size: 9pt;
}
</style>
