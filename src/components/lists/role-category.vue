<template>
    <v-select
        v-model="item"
        :items="items"
        :label="$t('Role Category')"
        :required="required"
        item-title="title"
        item-value="id"
        return-object
    />
</template>

<script lang="ts" setup>
import { API_ROLES_CATEGORIES } from '@/constants/api_routes'

import { computed, onBeforeMount, ref } from 'vue'
import axios from 'axios'

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

const items = ref([])

const item = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
})

onBeforeMount(() => axios.get(API_ROLES_CATEGORIES).then((response: any) => items.value = response))
</script>
