<template>
    <v-container>
        <h1 class="text-h4 mb-4">
            {{ $t('Become a coordinator') }}
        </h1>

        <wizard
            :custom-tabs="tabs"
            navigable-tabs
            @change="onChangeTab"
        >
            <div>
                <div v-if="hasTab(0)">
                    <v-row>
                        <v-col class="text-h6 mb-2" cols="12">
                            {{ $t('Specify a link to the bot you want to become the coordinator of.') }}
                        </v-col>

                        <v-col cols="12">
                            {{ $t('For example, @VolunteersCrmBot or https://t.me/VolunteersCrmBot.') }}
                        </v-col>

                        <v-col cols="12">
                            <v-text-field
                                v-model="form.bot"
                                :label="$t('Bot Username')"
                                density="comfortable"
                                variant="underlined"
                            />
                        </v-col>
                    </v-row>
                </div>

                <div v-if="hasTab(1)">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="form.name"
                                :label="$t('How can I call you?')"
                                density="comfortable"
                                variant="underlined"
                            />
                        </v-col>

                        <v-col cols="12">
                            <v-text-field
                                v-model="form.city"
                                :label="$t('What city do you live in?')"
                                density="comfortable"
                                variant="underlined"
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
                                :hint="$t('Please tell us about yourself! If you have experience volunteering or working in social projects, don\'t forget to mention!')"
                                :label="$t('About you')"
                                persistent-hint
                            />
                        </v-col>
                    </v-row>
                </div>

                <div v-if="hasTab(2)">
                    <v-row>
                        <v-col cols="12">
                            <v-textarea
                                v-model="form.source"
                                :label="$t('How did you hear about volunteering for the :name project?', { name: botName })"
                            />
                        </v-col>

                        <v-col cols="12">
                            {{ $t('We carefully and attentively treat the information we work with, so it is very important for us to understand who the people who come to us are.') }}
                        </v-col>

                        <v-col cols="12">
                            {{ $t('If there are specific people who referred you, please refer to them.') }}
                        </v-col>

                        <v-col cols="12">
                            <v-todo
                                v-model="form.recommendations"
                                :hint="$t('If you can be recommended by one of the current project participants, write here his or her telegram-nickname.')"
                                :label="$t('Recommendations')"
                            />
                        </v-col>
                    </v-row>
                </div>

                <div v-if="hasTab(3)">
                    <v-row>
                        <v-col cols="12">
                            <v-select
                                v-model="form.roles"
                                :label="$t('Choose the role you are interested in')"
                            />
                        </v-col>
                    </v-row>
                </div>
            </div>
        </wizard>
    </v-container>
</template>

<script lang="ts" setup>
import 'form-wizard-vue3/dist/form-wizard-vue3.css'

import VTodo from '@/components/lists/todo.vue'

// https://github.com/bahadirsofuoglu/form-wizard-vue3?ref=vuejsexamples.com
import Wizard from 'form-wizard-vue3'
import { computed, ref } from 'vue'
import { trans } from 'laravel-vue-i18n'

const tabIndex = ref(0)

const tabs = ref([
    { title: trans('Volunteer Team'), icon: 'back' },
    { title: trans('About You'), icon: 'back' },
    { title: trans('About Team'), icon: 'back' },
    { title: trans('Team Roles'), icon: 'back' }
])

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

const onChangeTab = (index: number) => {
    tabIndex.value = index
}

const hasTab = (index: number): boolean => {
    return tabIndex.value === index
}

const loadBot = () => {
    bot.value.name = 'Some Bot'
}
</script>
