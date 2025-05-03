<script setup lang="ts">
import { useParallax } from '@vueuse/core';

const mouseInside = ref(false);

const target = useTemplateRef<HTMLElement>('target')
const adjust = (i: number) => mouseInside.value ? i * -30 : 0;
const parallax = reactive(useParallax(target, {
    mouseRollAdjust: adjust,
    mouseTiltAdjust: adjust
}));


onMounted(() => {
    target.value?.addEventListener('mouseleave', event => {
        mouseInside.value = false;
    });
    target.value?.addEventListener('mouseenter', event => {
        mouseInside.value = true;
    });
});
</script>

<template>
    <div class="mx-auto h-screen px-10 max-w-screen-xl lg:flex items-center justify-center opacity-0 sm:h-screen"
        style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px); opacity: 1;">
        <div class="flex w-full flex-col lg:w-1/2">
            <h1 class="mb-6 max-w-5xl text-5xl font-semibold leading-none tracking-tight text-primary text-balance sm:text-7xl md:text-8xl lg:text-6xl xl:text-7xl 2xl:text-8xl">Dublin High's<div>
                </div><span class="gfr-title">Gael Force Robotics</span></h1>
            <p class="mb-6 max-w-2xl text-sm font-light text-gray-400 text-balance sm:text-lg md:text-lg lg:mb-8 lg:text-lg xl:text-xl 2xl:text-2xl">
                We are a <span class="font-extrabold">student-run</span> robotics club at Dublin High School that competes in the VEX Robotics Competition.
                Our community is diverse, inclusive, and welcoming to all students interested in STEM, exploring who they are, or just looking to have fun.</p>
            <p class="hidden">
                Roll: {{ parallax.roll }}
                <br>
                Tilt: {{ parallax.tilt }}
                <br>
                Mouse Inside: {{ mouseInside }}
            </p>
        </div>
        <div class="lg:w-1/2 items-center justify-center block lg:flex">
            <Tilt :repel-at-mouse="false" :horizontal-tilt-angle="30" :vertical-tilt-angle="30">
                <NuxtImg class="rounded-lg ring-4 ring-gray-700" src="/gfr-worlds-2023.jpg" alt="GFR at 2023 worlds" priority />
            </Tilt>
            <!-- <div ref="target" class="z-10"
                :style="`will-change: transform; transition: ${mouseInside ? 0 : 700}ms cubic-bezier(0.03, 0.98, 0.52, 0.99); transform: perspective(1000px) rotateX(${parallax.roll}deg) rotateY(${parallax.tilt}deg) scale3d(1, 1, 1);`">
                <!-- <NuxtImg class="hidden rounded-lg ring-4 ring-gray-700 2xl:block" src="/gfr-worlds-2023.jpg" alt="GFR at 2023 worlds" priority />
                <NuxtImg class="hidden rounded-lg ring-4 ring-gray-700 xl:block 2xl:hidden" src="/gfr-worlds-2023.jpg" alt="GFR at 2023 worlds" priority />
                 
                <NuxtImg class="rounded-lg ring-4 ring-gray-700" src="/gfr-worlds-2023.jpg" alt="GFR at 2023 worlds" priority />
            </div> -->
        </div>
    </div>
</template>