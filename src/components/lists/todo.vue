<template>
    <v-text-field
        v-for="(value, key) in items"
        v-model="items[key]"
        :label="$t('ToDo :id', { id: key + 1 })"
        hide-details
        prepend-icon="mdi-format-list-checks"
        variant="underlined"
    />
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import _ from 'lodash'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const items = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
})

watch(props.modelValue, (values: string[]) => {
    if (_.every(values, value => !! value)) {
        items.value.push('')
    }
})
</script>
