<template>
    <div
        class="text-right text-grey-darken-1"
        v-text="$t('The data is updated every :minutes minutes.', { minutes })"
    />
</template>

<script lang="ts" setup>
import {useStore} from "vuex";
import {ref} from "vue";

const store = useStore()

const minutes = ref(store.getters['meta/getTimesUpdateEvery'])
</script>
