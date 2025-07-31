<script setup lang="ts">
defineProps<{
    src: string;
    width?: number;
    height?: number;
}>();
</script>

<template>
    <NuxtImg class="aspect-square rounded-md bg-black max-h-40" :src="src" :width="width" :height="height" />
</template>