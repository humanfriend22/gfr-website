<script setup lang="ts">
defineProps<{
    src: string;
    width?: number;
    height?: number;
}>();
</script>

<template>
    <NuxtImg class=" aspect-square rounded-md bg-black" :src="src" :width="width" :height="height" />
</template>