<template>
    <audio-player :option="options" />
</template>

<script lang="ts" setup>
import AudioPlayer from 'vue3-audio-player'
import { ref } from 'vue'

const props = defineProps<{
    content: AudioMessageType
}>()

const options = ref({
    src: props.content.src
})
</script>
