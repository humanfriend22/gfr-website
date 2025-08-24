<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';

const stepIndex = ref(0);
const isMobile = useMediaQuery("(max-width: 768px)");
</script>

<template>
    <div>
        <div v-if="isMobile" class="px-3 flex flex-col gap-2">
            <div v-for="(step, index) in site.steps.filter(step => step.title !== '')" class="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" checked="true" />
                <div class="collapse-title font-semibold">{{ index }} {{ step.title }}</div>
                <div class="collapse-content text-sm prose" v-html="renderStepMarkdown(step.markdown)"></div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-10" v-else>
            <ul class="steps steps-vertical w-full">
                <li v-for="(step, index) in site.steps.filter(step => step.title !== '')" :class="'step ' + (index <= stepIndex ? 'step-primary' : '')" @click="stepIndex = index"
                    class="cursor-pointer">
                    <span :class="'step-icon ' + (index == stepIndex + 1 ? 'animate-pulse' : '')">{{ index }}</span>{{ step.title }}
                </li>
                <!-- <li class="step">
                        <span class="step-icon  animate-pulse">1</span>Test
                    </li> -->
            </ul>
            <div class="text-xl font-base">
                <div class=" prose" v-html="renderStepMarkdown(site.steps[stepIndex]!.markdown)"></div>
            </div>
        </div>
    </div>
</template>