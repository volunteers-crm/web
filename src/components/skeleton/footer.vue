<template>
    <footer>
        {{ year }} {{ appName }}
    </footer>
</template>

<script setup lang="ts">
import {ref} from "vue";

import {APPLICATION_TITLE} from "../../constants/meta";

const appName = ref(APPLICATION_TITLE)

const year = ref(new Date().getFullYear())
</script>
