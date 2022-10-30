<template>
    <v-table>
        <thead>
        <tr>
            <th v-text="$t('Name')" />
            <th v-text="$t('Bot')" />
            <th v-text="$t('City')" />
            <th v-text="$t('Created At')" />
            <th v-text="$t('Updated At')" v-if="props.updated" />
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(item, index) in items"
            :key="item.id"
            class="link-cursor colorized"
        >
            <v-dialog
                v-model="dialogs[index]"
                max-width="800"
                persistent
            >
                <template v-slot:activator="{ props }">
                    <td v-bind="props" v-text="item.user.name" />
                    <td v-bind="props" v-text="item.bot.title" />
                    <td v-bind="props" v-text="item.city" />
                    <td v-bind="props" v-html="dateFormatFullWithTz(item.created_at)" />
                    <td v-bind="props" v-html="dateFormatFullWithTz(item.updated_at)" v-if="updated" />
                </template>

                <v-card>
                    <v-card-title>
                        {{ item.user.name }}
                    </v-card-title>

                    <v-card-subtitle>
                        {{ item.bot.title }}
                    </v-card-subtitle>

                    <v-card-text>
                        <v-preview :item="item" />
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer />

                        <v-confirm
                            :button-text="$t('Accept')"
                            :confirm-text="$t('Are you sure you want to <span class=\'text-red\'>allow</span> <b>:name</b> to access all appeals sended from the <b>:bot</b> bot?', { name: item.user.name, bot: item.bot.title})"
                            :url="confirmUrl(item.id)"
                            :success="() => removeItem(index)"
                            color="green"
                        />

                        <v-confirm
                            :button-text="$t('Decline')"
                            :confirm-text="$t('Are you sure you want to <span class=\'text-red\'>decline</span> <b>:name</b>\'s offer to volunteer and see appeals from the <b>:bot</b> bot?', { name: item.user.name, bot: item.bot.title})"
                            :url="confirmUrl(item.id)"
                            :success="() => removeItem(index)"
                            color="red"
                        />

                        <v-btn
                            v-text="$t('Close')"
                            @click="dialogs[index] = false"
                        />
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </tr>
        </tbody>
    </v-table>
</template>

<script lang="ts" setup>
import VConfirm from '@/components/dialogs/confirm.vue'
import VPreview from '@/components/tables/become-preview.vue'

import { API_BECOMES_ACTION } from '@/constants/api_routes'
import { dateFormatFullWithTz } from '@/helpers/date'

import { onMounted, ref } from 'vue'
import axios from 'axios'

const items = ref([])
const dialogs = ref({})
const loading = ref(false)

const props = withDefaults(
    defineProps<{
        url: string,
        updated?: boolean
    }>(),
    {
        updated: false
    }
)

onMounted(() => axios.get(props.url).then(response => items.value = response.data))

const confirmUrl = (id: number) => API_BECOMES_ACTION.replace(':id', String(id))

const removeItem = (index: number) => {
    dialogs.value[index] = false

    items.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.link-cursor {
    cursor: pointer;
}

.colorized {
    &:hover {
        transition: background-color .3s;
        background-color: rgba(225, 218, 239, 0.98);
    }
}
</style>
