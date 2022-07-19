<template>
    <div
        :class="{'chat__message__me': isMe}"
        class="chat__message d-flex mb-3"
    >
        <div class="chat__message__avatar d-flex justify-end align-end px-2">
            <div class="chat__message__avatar__curve" />

            <v-avatar>
                <v-img
                    :alt="message.sender.name"
                    :src="message.sender.avatar"
                />
            </v-avatar>
        </div>

        <div class="chat__message__info pl-2 pt-2">
            <p class="text-subtitle-2" v-text="isMe ? $t('You') : message.sender.name" />

            <div class="chat__message__content">
                <component :is="template" :content="message.content" />
            </div>

            <div class="chat__message__info__actions d-flex justify-end">
                <p>
                    <span v-if="isEdited" class="pr-2" v-text="$t('edited')" />

                    {{ sentAt }}

                    <v-tooltip activator="parent" location="top">
                        <span>{{ $t('Created At') }}: {{ dateFormat(message.created_at) }}</span>

                        <span v-if="isEdited" class="pr-2">
                            <br>
                            {{ $t('Updated At') }}: {{ dateFormat(message.updated_at) }}
                        </span>
                    </v-tooltip>
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue'
import { dateFormat, dateFormatFull, dateFormatTime, isToday } from '@/helpers/date'
import { useUserStore } from '@/stores/user'

const props = defineProps<{
    message: object
}>()

const userStore = useUserStore()

const template = computed(() => defineAsyncComponent(() => import(`../content-types/${ props.message.type }.vue`)))

const sentAt = computed(() => {
    const date = props.message.created_at

    return isToday(date) ? dateFormatTime(date) : dateFormatFull(date)
})

const isEdited = computed(() => props.message.created_at !== props.message.updated_at)

const isMe = computed(() => props.message.sender.id === userStore.id)
</script>

<style lang="scss">
@import "@/assets/styles/_variables";
@import "@/assets/styles/_mixin";

.chat {
    $chat-border-radius-curve: calc($chat-border-radius * 1.5);
    $chat-box-shadow-radius: calc($chat-border-radius / 2);

    &__message {
        $background-color: white;

        margin-bottom: 10px;

        &:last-child {
            margin-bottom: 0;
        }

        &__avatar {
            position: relative;

            &__curve {
                bottom: 0;
                height: $chat-border-radius-curve;
                overflow: hidden;
                position: absolute;
                right: 0;
                width: $chat-border-radius-curve;

                &::before {
                    border-radius: 50%;
                    bottom: 0;
                    box-shadow: $chat-box-shadow-radius $chat-box-shadow-radius 0 0 $background-color;
                    content: "";
                    display: block;
                    height: 200%;
                    position: absolute;
                    right: 0;
                    width: 200%;
                }
            }
        }

        &__info {
            @include box-shadow(4px, 4px, 4px);

            background-color: $background-color;
            border-radius: $chat-border-radius $chat-border-radius $chat-border-radius 0;
            width: 100%;

            &__actions {
                color: #B9B9B9;
                font-size: 9pt;
                min-height: 20px;
                padding: 4px 10px;
                text-align: right;
            }
        }

        &__me {
            $background-color: #EFFDDE;

            .chat__message {
                &__avatar__curve {
                    &::before {
                        box-shadow: $chat-box-shadow-radius $chat-box-shadow-radius 0 0 $background-color;
                    }
                }

                &__info {
                    background-color: $background-color;
                }
            }
        }
    }
}
</style>
