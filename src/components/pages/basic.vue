<template>
    <v-container>
        <h1 class="text-h4 mb-4" v-text="props.title" />

        <v-layout>
            <slot />
        </v-layout>
    </v-container>
</template>

<script lang="ts" setup>
import {defineProps, onMounted} from "vue";
import {useStore} from "vuex";

const {commit} = useStore()

const props = defineProps<{
    title: string
}>()

onMounted(() => {
    commit('meta/setPageTitle', props.title)
})
</script>
