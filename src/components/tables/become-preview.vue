<template>
    <v-table>
        <tbody>
        <tr>
            <td>{{ $t('Coordinate:') }}</td>
            <td>
                <span v-if="item.is_coordinator" class="text-green" v-text="$t('Yes')" />
                <span v-else class="red-text" v-text="$t('No')" />
            </td>
        </tr>
        <tr>
            <td>{{ $t('City:') }}</td>
            <td>{{ item.city }}</td>
        </tr>
        <tr>
            <td>{{ $t('About:') }}</td>
            <td>{{ item.about }}</td>
        </tr>
        <tr>
            <td>{{ $t('Source:') }}</td>
            <td>{{ item.source }}</td>
        </tr>
        <tr>
            <td>{{ $t('Recommendations:') }}</td>
            <td v-if="item.recommendations.length">
                <ul>
                    <li
                        v-for="recommendation in item.recommendations"
                        class="mx-4"
                    >
                        {{ recommendation }}
                    </li>
                </ul>
            </td>
            <td v-else>{{ $t('No') }}</td>
        </tr>
        <tr>
            <td>{{ $t('Socials:') }}</td>
            <td v-if="item.socials.length">
                <ul>
                    <li
                        v-for="social in item.socials"
                        class="mx-4"
                    >
                        <a
                            :href="social"
                            target="_blank"
                            v-text="social"
                        />
                    </li>
                </ul>
            </td>
            <td v-else>{{ $t('No') }}</td>
        </tr>
        <tr>
            <td>{{ $t('Roles:') }}</td>
            <td v-if="item.roles.length">
                <v-roles-chip :roles="item.roles" />
            </td>
            <td v-else>{{ $t('No') }}</td>
        </tr>
        </tbody>
    </v-table>
</template>

<script lang="ts" setup>
import VRolesChip from '@/components/labels/roles.vue'

defineProps<{
    item: object
}>()
</script>
