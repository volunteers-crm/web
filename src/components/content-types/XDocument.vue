<template>
    <div class="d-flex align-center">
        <div>
            <v-img :src="content.preview" width="256" />
        </div>

        <div class="ma-6">
            <v-btn
                color="primary"
                download
                @click="download"
                v-text="$t('Download')"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    content: DocumentMessageType
}>()

const download = () => {
    window.open(props.content.src, '_blank')
}
</script>
