<script setup lang="ts">
const { text } = defineProps<{
    text: string;
}>();

function copy() {
    navigator.clipboard.writeText(text);
};
</script>

<template>
    <span class="hover:text-gfr-blue underline cursor-pointer duration-400" @click="copy">
        <slot />
    </span>
</template>