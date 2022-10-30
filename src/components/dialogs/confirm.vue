<template>
    <v-dialog
        v-model="dialog"
        max-width="500"
        persistent
    >
        <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                :variant="variant"
                :color="color"
            >
                {{ buttonText }}
            </v-btn>
        </template>

        <v-card>
            <v-card-title>
                {{ $t('Confirmation') }}
            </v-card-title>

            <v-card-text>
                {{ confirmText }}
            </v-card-text>

            <v-card-actions>
                <v-spacer />

                <v-btn
                    :disabled="loading"
                    :loading="loading"
                    :color="color"
                    @click="confirm"
                >
                    {{ $t('Yes') }}
                </v-btn>

                <v-btn
                    :disabled="loading"
                    @click="dialog = false"
                >
                    {{ $t('Cancel') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(
    defineProps<{
        modelValue?: any,
        buttonText: string,
        confirmText: string,
        url: string,
        method?: string,
        variant?: string,
        color?: string
    }>(),
    {
        modelValue: null,
        method: 'put',
        variant: 'elevated',
        color: 'black'
    }
)

const dialog = ref(false)
const loading = ref(false)

const content = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
})

const confirm = () => {
    loading.value = true

    axios[props.method](props.url)
        .then((response: any) => content.value = response.data)
        .then(() => dialog.value = false)
        .finally(() => loading.value = false)
}
</script>
