<script setup lang="ts">
defineProps<{
    src: string;
    width?: number;
    height?: number;
}>();
</script>

<template>
    <div class="aspect-square bg-black" :width="width" :height="height">
        <NuxtImg v-if="src !== ''" :src="src" alt="" class="w-full h-full rounded-md" />
        <div class="w-full h-full" v-else></div>
    </div>
</template>