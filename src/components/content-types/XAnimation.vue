<template>
    <div
        class="image d-flex align-center justify-center"
        :class="{image__loading: loading}"
        :style="{width: `${content.width}px`, height: `${content.height}px`}"
        @click="download"
    >
        <div v-if="loading">
            <v-progress-circular
                indeterminate
                color="grey-lighten-4"
            />
        </div>
        <div v-else>
            <v-icon>
                mdi-download-circle
            </v-icon>

            <div class="file__size">
                {{ content.size }}
            </div>
        </div>
    </div>

    <p v-if="!! content.text">
        {{ content.text }}
    </p>
</template>

<script lang="ts" setup>
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
</script>

<style lang="scss" scoped>
.image {
    background: #E6E6E6 url("@/assets/images/preview-background.webp") no-repeat;
    background-size: cover;
    cursor: pointer;
    opacity: .8;
    transition: opacity .2s;

    &:hover {
        opacity: 1;
    }

    &__loading {
        cursor: default;
        opacity: 1;
    }
}

.file {
    &__size {
        color: darkgray;
    }
}
</style>
