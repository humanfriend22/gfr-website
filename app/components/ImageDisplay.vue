<script setup lang="ts">
defineProps<{
    src: string;
    circle?: boolean;
}>();
</script>

<template>
    <div :class="'aspect-square ' + (circle ? ' mask mask-circle' : '') + (src !== '' ? 'bg-black' : '')">
        <NuxtImg v-if="src !== ''" :src="src" alt="" class="w-full h-full rounded-md" />
        <div class="w-full h-full" v-else></div>
    </div>
</template>