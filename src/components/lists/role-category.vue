<template>
    <v-select
        v-model="item"
        :items="items"
        :label="$t('Role Category')"
        :variant="variant"
        :required="required"
        return-object
        item-value="id"
        item-title="title"
    />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import { roleCategories } from '@/_fakes/roles'

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(
    defineProps<{
        modelValue: any,
        variant?: string,
        required?: boolean
    }>(),
    {
        variant: 'elevated',
        required: false
    }
)

const items = ref(roleCategories)

const item = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
})
</script>
