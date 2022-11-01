<template>
    <a
        :href="href"
        :target="target"
    >
        {{ title || href }}
    </a>
</template>

<script lang="ts" setup>
withDefaults(
    defineProps<{
        href: string,
        title?: string,
        target?: string
    }>(),
    {
        title: '',
        target: '_blank'
    }
)
</script>
