<template>
    <v-container>
        <h1 class="text-h4 mb-4">
            {{ $t('Become a coordinator') }}
        </h1>

        <v-card elevation="0">
            <v-card-text>
                <p class="mb-2">
                    {{ $t('Specify a link to the bot you want to become the coordinator of.') }}
                </p>

                <v-text-field
                    v-model="form.bot"
                    :hint="$t('For example, @VolunteersCrmBot or https://t.me/VolunteersCrmBot.')"
                    :label="$t('Bot Username')"
                    autofocus
                    density="comfortable"
                />
            </v-card-text>

            <v-card-actions class="justify-center">
                <v-btn
                    class="px-10"
                    variant="elevates"
                    @click="loadBot"
                >
                    {{ $t('Find a team') }}
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-fade-transition>
            <v-card v-if="hasLoadedBot" elevation="0">
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="form.name"
                                :label="$t('How can I call you?')"
                                density="comfortable"
                            />
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="form.city"
                                :label="$t('What city do you live in?')"
                                density="comfortable"
                            />
                        </v-col>

                        <v-col cols="12">
                            <v-todo
                                v-model="form.socials"
                                :label="$t('Social Network')"
                            />
                        </v-col>

                        <v-col cols="12">
                            <v-textarea
                                v-model="form.about"
                                :label="$t('Please tell us about yourself! If you have experience volunteering or working in social projects, don\'t forget to mention!')"
                                rows="3"
                            />
                        </v-col>

                        <v-col cols="12">
                            <v-textarea
                                v-model="form.source"
                                :hint="$t('We carefully and attentively treat the information we work with, so it is very important for us to understand who the people who come to us are. If there are specific people who referred you, please refer to them.')"
                                :label="$t('How did you hear about volunteering for the :name project?', { name: botName })"
                                rows="3"
                            />
                        </v-col>

                        <v-col cols="12">
                            <v-todo
                                v-model="form.recommendations"
                                :hint="$t('If you can be recommended by one of the current project participants, write here his or her telegram-nickname.')"
                                :label="$t('Recommendations')"
                            />
                        </v-col>

                        <v-col cols="12">
                            <v-select
                                v-model="form.roles"
                                :label="$t('Choose the role you are interested in')"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-btn>
                        {{ $t('Sent') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-fade-transition>
    </v-container>
</template>

<script lang="ts" setup>
import VTodo from '@/components/lists/todo.vue'

import { computed, ref } from 'vue'

const form = ref({
    bot: null,
    name: null,
    city: null,
    socials: [],
    about: null,
    source: null,
    recommendations: [],
    roles: []
})

const bot = ref({
    name: ''
})

const botName = computed(() => bot.value.name)

const hasLoadedBot = computed(() => !! bot.value?.id)

const loadBot = () => {
    bot.value.id = 1
    bot.value.name = 'Some Bot'
}
</script>
