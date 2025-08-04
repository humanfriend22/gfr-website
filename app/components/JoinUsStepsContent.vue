<script setup lang="ts">

const steps = ['Summer Camp & Workshops', 'Development Academy', 'Contact Captains', 'Compete!'];
const stepsContent = [
    'Gael Force Robotics hosts many summer camps and workshops to introduce students to robotics. Check out our events page for more information on upcoming events.',
    'Join our Development Academy to learn the basics of robotics, programming, and engineering. Read this blog post to learn more.',
    'Reach out to our captains for any questions or guidance on how to get involved.',
    'Participate in competitions and showcase your skills!'
];
const stepIndex = ref(0);
</script>

<template>
    <div class="grid grid-cols-2 gap-10">
        <ul class="steps steps-vertical w-full">
            <li v-for="(step, index) in site.steps.filter(step => step.title !== '')" :class="'step ' + (index <= stepIndex ? 'step-primary' : '')" @click="stepIndex = index" class="cursor-pointer">
                <span :class="'step-icon ' + (index == stepIndex + 1 ? 'animate-pulse' : '')">{{ index }}</span>{{ step.title }}
            </li>
            <!-- <li class="step">
                        <span class="step-icon  animate-pulse">1</span>Test
                    </li> -->
        </ul>
        <div class="text-xl font-base">
            <div class=" prose" v-html="renderStepMarkdown(site.steps[stepIndex].markdown)"></div>
        </div>
    </div>
</template>