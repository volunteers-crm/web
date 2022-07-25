<template>
    <v-row
        v-for="(value, index) in items"
    >
        <v-col :cols="canStorage ? 11 : 12">
            <v-text-field
                v-model="value.title"
                :density="density"
                :label="$t(`${label} :id`, { id: index + 1 })"
                :required="hasRequired(index)"
                hide-details
                prepend-icon="mdi-format-list-checks"
            />
        </v-col>

        <v-col v-if="canStorage" cols="1">
            <v-checkbox
                v-model="value.is_storage"
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
        </v-col>
    </v-row>

    <v-row v-if="!! hint">
        <v-col class="text-grey" cols="12">
            {{ hint }}
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue'
import _ from 'lodash'

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(
    defineProps<{
        modelValue: any,
        label?: string,
        hint?: string
        density?: string,
        required?: boolean,
        canStorage?: boolean
    }>(),
    {
        label: 'Todo',
        hint: '',
        density: 'elevated',
        required: false,
        canStorage: false
    }
)

const items = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
})

const createNewItem = (values: string[]) => {
    if (_.every(values, (value: RoleListItem) => !! value.title)) {
        items.value.push({
            title: '',
            is_storage: false
        })
    }
}

const hasRequired = (index: number): boolean => props.required && (index + 1) < items.value.length

watch(props.modelValue, (values: string[]) => createNewItem(values))

watch(
    () => props.canStorage,
    (value: boolean) => {
        if (! value) {
            _.map(items.value, (item: RoleListItem) => item.is_storage = false)
        }
    })

onMounted(() => createNewItem(items.value))
</script>
