<template>
    Dashboard Page
</template>

<script lang="ts" setup>
import {onBeforeMount} from "vue";
import {useStore} from "vuex";

const {commit} = useStore()

onBeforeMount(() => commit('meta/setPageTitle', 'Dashboard'))
</script>
