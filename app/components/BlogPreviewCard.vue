<script setup lang="ts">
const { index, previewMode } = defineProps<{
    index: number;
    blog: Blog;
    previewMode?: boolean;
    clickHandler: (blog: Blog) => void;
}>();

const first = index === 0;
const left = index % 2 !== 0;
</script>

<template>
    <div @click="() => clickHandler(blog)">
        <div :class="(previewMode ? 'h-80' : 'h-40') + ' hidden lg:flex flex-row w-full gap-1 hover:cursor-pointer ' + (left ? 'flex-row-reverse' : '')">
            <!-- Left side -->
            <div class="flex-1" v-if="!previewMode">
            </div>

            <!-- Center divider -->
            <div class="flex flex-col justify-center items-center w-6 h-full mb-5">
                <div :class="'h-1.5 w-0.5 ' + (first ? 'bg-black' : 'bg-gray-400')"></div>
                <div class="w-3 aspect-square bg-gray-400"></div>
                <div class="h-full w-0.5 bg-gray-400"></div>
            </div>

            <!-- Right side -->
            <div class="flex-1 h-full">
                <div :class="'flex flex-col justify-start h-full ' + (left ? 'items-end' : 'items-start')">
                    <span class="text-gray-400 text-sm">{{ formatDate(blog.date) }}</span>
                    <div class="font-bold text-3xl">{{ blog.title }}</div>
                    <div :class="'flex flex-row gap-3 ' + (left ? 'flex-row-reverse' : '')">
                        <NuxtImg :src="blog.image" alt="blog image preview" class="rounded-md flex-1 mt-2 w-3/5" />
                        <div class="mt-3">
                            <p class="text-gray-400 text-md mb-4">
                                {{ blog.description }}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="flex flex-col px-2 events-mobile gap-y-0 lg:hidden">
            <div class="flex flex-row gap-x-2 h-fit w-full">
                <div class="flex flex-col justify-center items-center">
                    <div :class="'h-1.5 w-0.5 ' + (first ? 'bg-black' : 'bg-gray-400')"></div>
                    <div class="w-3 aspect-square bg-gray-400"></div>
                    <div class="h-full w-0.5 bg-gray-400"></div>
                </div>
                <div class="flex-grow mb-5">
                    <span class="text-gray-400 text-sm">{{ formatDate(blog.date) }}</span>
                    <h1 class="font-bold text-3xl">{{ blog.title }}</h1>
                    <NuxtImg :src="blog.image" alt="blog image preview" class="rounded-md mt-2 max-h-36" />
                    <div class="mt-2">
                        <p class="text-gray-400 text-md">
                            {{ blog.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>