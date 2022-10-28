<template>
    <div class="chat fill-height d-flex flex-column">
        <div
            class="chat__messages pa-5 overflow-y-auto"
            ref="messagesList"
        >
            <v-message
                v-for="message in messages"
                :message="message"
            />
        </div>

        <div v-if="!isClosed" class="chat__action d-flex">
            <div class="w-100">
                <v-textarea
                    v-model="message"
                    :disabled="hasSendingMessage"
                    :placeholder="$t('Write a message...')"
                    ref="messageBox"
                    auto-grow
                    autofocus
                    class="chat__action__message-box px-2"
                    density="comfortable"
                    hide-details
                    rows="2"
                    variant="underlined"
                    @keyup.ctrl.enter="sendMessage"
                />
            </div>

            <div class="px-2 pt-1">
                <v-btn
                    :color="message.length ? 'primary' : 'default'"
                    :disabled="!message.length || hasSendingMessage"
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
import { API_APPEALS_MESSAGES } from '@/constants/api_routes'

import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

const props = defineProps<{
    appealId: number,
    status: string
}>()

const messagesList = ref()
const messageBox = ref()

const message = ref('')

const messages = ref([])

const hasSendingMessage = ref(false)

const isClosed = computed(() => [STATUS_DONE, STATUS_CANCELLED].includes(props.status))

const sendMessage = () => {
    if (! message.value.length) {
        return
    }

    hasSendingMessage.value = true

    axios.post(API_APPEALS_MESSAGES.replace(':id', String(props.appealId)), { message: message.value })
        .then((response: any) => {
            message.value = ''
            messages.value.push(response?.data)
        })
        .finally(() => {
            hasSendingMessage.value = false
            messagesList.value.scrollTop = messagesList.value.scrollHeight
        })
}

onMounted(() => {
    axios.get(API_APPEALS_MESSAGES.replace(':id', String(props.appealId)))
        .then((response: any) => messages.value = response.data)
})
</script>

<style lang="scss" scoped>
.chat {
    max-height: calc(100vh - 64px - 96px);
    overflow-y: auto;

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
