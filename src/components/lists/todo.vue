<template>
    <v-row
        v-for="(value, key) in items"
    >
        <v-col cols="12">
            <v-text-field
                v-model="items[key]"
                :density="density"
                :label="$t(`${label} :id`, { id: key + 1 })"
                :required="hasRequired(key)"
                hide-details
                prepend-icon="mdi-format-list-checks"
            />
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
        required?: boolean
    }>(),
    {
        label: 'Todo',
        hint: '',
        density: 'elevated',
        required: false
    }
)

const items = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
})

const createNewItem = (values: string[]) => {
    if (_.every(values, value => !! value)) {
        items.value.push('')
    }
}

const hasRequired = (index: number): boolean => props.required && (index + 1) < items.value.length

watch(props.modelValue, (values: string[]) => createNewItem(values))

onMounted(() => createNewItem(items.value))
</script>
