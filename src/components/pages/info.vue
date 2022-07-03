<template>
    <div class="d-flex justify-center align-center flex-column fill-height">
        <div class="d-flex justify-center text-center box__info">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
import {defineProps, onBeforeMount} from "vue";
import {useStore} from "vuex";

const {commit} = useStore()

const props = defineProps<{
    title: string
}>()

onBeforeMount(() => commit('meta/setPageTitle', props.title))
</script>

<style lang="scss">
.box__info {
    width: 100%;
    max-width: 480px;
}
</style>
