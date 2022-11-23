<template>
    <v-btn
        variant="flat"
        size="x-large"
        :loading="loading"
        @click="download"
    >
        <template v-slot:prepend>
            <v-img
                :src="getMaterialFileIcon(fileExtension())"
                min-width="48"
                max-width="64"
                min-height="48"
                max-height="64"
            />
        </template>

        <div>
            <p>
                {{ $t('Download') }}
            </p>

            <p class="button__description">
                {{ content.size }}
            </p>
        </div>
    </v-btn>

    <p v-if="!! content.text" class="mt-2">
        {{ content.text }}
    </p>
</template>

<script lang="ts" setup>
import { getMaterialFileIcon } from 'file-extension-icon-js'
import { downloadFile } from '@/helpers/download'
import { ref } from 'vue'

const props = defineProps<{
    content: AnimationMessageType
}>()

const loading = ref<boolean>(false)

const download = () => {
    if (loading.value) {
        return
    }

    loading.value = true

    downloadFile(
        props.content.url,
        () => loading.value = false,
        () => loading.value = false
    )
}

const fileExtension = () => {
    const values = props.content.filename.split('/')

    return values[values.length - 1]
}
</script>

<style lang="scss" scoped>
.button {
    &__description {
        color: darkgray;
        font-weight: 300;
        font-size: 9pt;
    }
}
</style>
