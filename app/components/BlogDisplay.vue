<script setup lang="ts">
defineProps<{
    blog: Blog;
    content: string;
    widthPercentage: number;
}>();
</script>

<template>
    <div class="mx-4  lg:mx-auto h-full flex flex-col gap-4" :style="{ width: `${widthPercentage}vw` }">
        <h1 class="font-bold text-3xl lg:text-5xl">{{ blog?.title }}</h1>
        <p class="text-gray-400">{{ blog?.description }}</p>
        <div class="flex flex-col gap-1 text-sm">
            <span class="text-gray-100">{{ blog?.author }}</span>
            <span class="text-gray-400">{{ formatDate(blog?.date) }}</span>
        </div>
        <div>
            <NuxtImg :src="blog?.image" class="h-fit rounded-box" />
        </div>
        <div class="prose lg:prose-xl w-full" v-html="content"></div>
    </div>
</template>