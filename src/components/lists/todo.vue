<template>
    <v-text-field
        v-for="(value, key) in items"
        v-model="items[key]"
        :label="$t(`${label} :id`, { id: key + 1 })"
        hide-details
        prepend-icon="mdi-format-list-checks"
        variant="underlined"
    />
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
    }>(),
    {
        label: 'Todo',
        hint: ''
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

watch(props.modelValue, (values: string[]) => createNewItem(values))

onMounted(() => createNewItem(items.value))
</script>
