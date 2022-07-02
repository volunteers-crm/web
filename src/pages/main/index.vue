<template>
    <v-text-box
        header="The CRM"
        subheader="for volunteers"
    />

    <div>
        <v-btn-telegram-sign-in />
    </div>
</template>

<script setup lang="ts">
import VTextBox from '@/components/boxes/text.vue'
import VBtnTelegramSignIn from '@/components/buttons/telegram/sign-in.vue'</script>
