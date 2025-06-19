<script setup lang="ts">
defineProps({
    first: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <div class="flex flex-col px-2 events-mobile gap-y-0 lg:hidden">
        <div class="flex flex-row gap-x-2 h-fit w-full">
            <div class="flex flex-col justify-center items-center">
                <div :class="'h-1.5 w-0.5 ' + (first ? 'bg-black' : 'bg-gray-400')"></div>
                <div class="w-3 aspect-square bg-gray-400"></div>
                <div class="h-full w-0.5 bg-gray-400"></div>
            </div>
            <div class="flex-grow mb-5">
                <span class="text-gray-400 text-sm">7/10/2025</span>
                <h1 class="font-bold text-3xl">Girl Powered 2024</h1>
                <NuxtImg src="girlpowered2024.jpg" class="rounded-md mt-2 max-h-36" />
                <div class="mt-2">
                    <p class="text-gray-400 text-md">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor non felis ac imperdiet. Aliquam consequat, augue nec finibus lacinia, nibh est porta urna, sed
                        suscipit turpis leo ut nunc libero.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>