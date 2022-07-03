<template>
    <v-btn :to="signIn" color="primary">
        {{ $t('Sign In') }}
    </v-btn>
</template>

<script lang="ts" setup>
import {ROUTE_SIGN_IN} from "@/routes/names";

import {ref} from "vue";

const signIn = ref({
    name: ROUTE_SIGN_IN
})
</script>
