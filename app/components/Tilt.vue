<script setup lang="ts">
import { useParallax } from '@vueuse/core';

const props = defineProps({
    repelAtMouse: {
        type: Boolean,
        default: false
    },
    horizontalTiltAngle: {
        type: Number,
        default: 20
    },
    verticalTiltAngle: {
        type: Number,
        default: 20
    },
});

const rollMultiplier = (props.repelAtMouse ? 1 : -1) * props.horizontalTiltAngle;
const tiltMultiplier = (props.repelAtMouse ? 1 : -1) * props.verticalTiltAngle;

const mouseInside = ref(false);
const target = useTemplateRef('target');
const { tilt, roll } = useParallax(target, {
    mouseRollAdjust: (i: number) => {
        return mouseInside.value ? (i * rollMultiplier) : 0
    },
    mouseTiltAdjust: (i: number) => {
        return mouseInside.value ? (i * tiltMultiplier) : 0
    }
});
</script>

<template>
    <div ref="target" class="z-80" @mouseenter="mouseInside = true" @mouseleave="mouseInside = false"
        :style="`will-change: transform; transition: ${mouseInside ? 0 : 700}ms cubic-bezier(0.03, 0.98, 0.52, 0.99); transform: perspective(1000px) rotateX(${roll}deg) rotateY(${tilt}deg) scale3d(1, 1, 1);`">
        <slot />
    </div>
</template>