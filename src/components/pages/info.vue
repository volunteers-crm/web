<template>
    <div class="d-flex justify-center align-center flex-column fill-height">
        <div class="d-flex justify-center text-center box__info">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { useMetaStore } from '@/stores/meta'

const props = defineProps<{
    title: string
}>()

const metaStore = useMetaStore()

onBeforeMount(() => metaStore.setPageTitle(props.title))
</script>

<style lang="scss" scoped>
.box__info {
    max-width: 480px;
    width: 100%;
}
</style>
