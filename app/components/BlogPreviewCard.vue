<script setup lang="ts">
defineProps({
    first: {
        type: Boolean,
        default: false
    },
    left: {
        type: Boolean,
        default: false
    },
});
</script>

<template>
    <div :class="'flex flex-row w-full gap-1 h-72 ' + (left ? 'flex-row-reverse' : '')">
        <!-- Left side -->
        <div class="flex-1">
        </div>

        <!-- Center divider -->
        <div class="flex flex-col justify-center items-center w-6 h-full mb-5">
            <div class="h-1.5 w-0.5 bg-gray-400 small-line" v-if="!first"></div>
            <div class="w-3 aspect-square bg-gray-400"></div>
            <div class="h-full w-0.5 bg-gray-400"></div>
        </div>

        <!-- Right side -->
        <div class="flex-1 h-full">
            <div :class="'flex flex-col justify-start h-full ' + (left ? 'items-end' : 'items-start')">
                <span class="text-gray-400 text-sm">7/10/2025</span>
                <h1 class="font-bold text-3xl">Girl Powered 2024</h1>
                <div :class="'flex flex-row gap-3 ' + (left ? 'flex-row-reverse' : '')">
                    <NuxtImg src="girlpowered2024.jpg" class="rounded-md flex-1 mt-2 w-3/5" />
                    <div class="mt-3">
                        <p class="text-gray-400 text-md mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor non felis ac imperdiet. Aliquam consequat, augue nec finibus lacinia, nibh est porta urna, sed
                            suscipit turpis leo ut nunc libero.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>