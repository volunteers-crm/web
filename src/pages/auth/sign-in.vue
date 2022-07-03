<template>
    Process Telegram data response...

    <div v-text="avatar" />
    <div>
        {{ firstName }} {{ lastName }}
    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const id = ref('id')
const username = ref('username')
const firstName = ref('First Name')
const lastName = ref('Last Name')
const avatar = ref('photo_url')
const hash = ref('hash')
</script>
