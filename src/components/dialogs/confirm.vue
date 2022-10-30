<template>
    <v-dialog
        v-model="dialog"
        max-width="500"
        persistent
    >
        <template v-slot:activator="{ props }">
            <v-btn
                v-if="buttonIcon.length"
                v-bind="props"
                :color="color"
                :icon="buttonIcon"
                :variant="variant"
            >
            </v-btn>

            <v-btn
                v-else
                v-bind="props"
                :color="color"
                :icon="buttonIcon"
                :variant="variant"
            >
                {{ buttonText }}
            </v-btn>
        </template>

        <v-card>
            <v-card-title>
                {{ $t('Confirmation') }}
            </v-card-title>

            <v-card-text v-html="confirmText" />

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
        buttonText?: string,
        buttonIcon?: string,
        confirmText: string,
        url: string,
        method?: string,
        variant?: string,
        color?: string,
        success?: any,
        failed?: any
    }>(),
    {
        modelValue: null,
        method: 'post',
        variant: 'elevated',
        color: 'black',
        success: () => true,
        failed: () => true
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
        .then(props.success)
        .then(() => dialog.value = false)
        .finally(props.failed)
        .finally(() => loading.value = false)
}
</script>
