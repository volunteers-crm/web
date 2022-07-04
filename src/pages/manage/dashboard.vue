<template>
    Dashboard Page
</template>

<script lang="ts" setup>
import {onBeforeMount} from "vue";

import store from "@/store";

onBeforeMount(() => store.commit('meta/setPageTitle', 'Dashboard'))
</script>
