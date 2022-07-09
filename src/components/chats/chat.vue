<template>
    <div class="chat fill-height d-flex flex-column">
        <div class="chat__messages pa-5 overflow-y-auto">
            <v-message
                v-for="message in fakeMessages()"
                :key="message.id"
                :message="message"
            />
        </div>

        <div v-if="!isClosed" class="chat__action d-flex">
            <div class="w-100">
                <v-textarea
                    v-model="message"
                    :placeholder="$t('Write a message...')"
                    auto-grow
                    autofocus
                    class="chat__action__message-box"
                    density="comfortable"
                    hide-details
                    rows="2"
                    @keyup.ctrl.enter="sendMessage"
                />
            </div>

            <div class="px-2 pt-1">
                <v-btn
                    color="primary"
                    icon="mdi-send"
                    variant="text"
                    @click="sendMessage"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import VMessage from '@/components/chats/message.vue'

import { STATUS_CANCELLED, STATUS_DONE } from '@/constants/statuses'

import { computed, ref } from 'vue'
import { findMessages } from '@/_fakes/chat'

const props = defineProps<{
    issueId: number,
    status: string
}>()

const message = ref('')

const fakeMessages = ref(() => findMessages(props.issueId))

const isClosed = computed(() => [STATUS_DONE, STATUS_CANCELLED].includes(props.status))

const sendMessage = () => {
    alert('sent!')
}
</script>

<style lang="scss" scoped>
.chat {
    &__messages {
        background: #E5F6E5 url("@/assets/images/chat-background.webp") repeat fixed;
        box-shadow: inset 0 2px 1px -1px rgba(0, 0, 0, 0.2),
        inset 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        inset 0px 1px 3px 0px rgba(0, 0, 0, 0.12) !important;
        height: 100%;
    }

    &__action {
        &__message-box {
            max-height: 164px !important;
            overflow-y: auto !important;
        }
    }
}
</style>
