<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const { repelAtMouse, horizontalTiltAngle, verticalTiltAngle } = defineProps<{
    repelAtMouse: boolean;
    horizontalTiltAngle: number;
    verticalTiltAngle: number;
}>();

const target = useTemplateRef('target');
const mouseX = ref(0);
const mouseY = ref(0);
const isHovered = ref(false);

const tilt = computed(() => {
    if (!isHovered.value || !target.value) return 0;

    const rect = target.value.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = mouseX.value - centerX;
    const deltaY = mouseY.value - centerY;

    const rotateX = (deltaY / (rect.height / 2)) * verticalTiltAngle;
    const rotateY = (deltaX / (rect.width / 2)) * horizontalTiltAngle;

    return repelAtMouse ? rotateY : -rotateY;
});

const roll = computed(() => {
    if (!isHovered.value || !target.value) return 0;

    const rect = target.value.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = mouseX.value - centerX;
    const deltaY = mouseY.value - centerY;

    const rotateX = (deltaY / (rect.height / 2)) * verticalTiltAngle;

    return repelAtMouse ? rotateX : -rotateX;
});

let rafId: number | null = null;

const handleMouseMove = (e: MouseEvent) => {
    if (rafId) cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(() => {
        mouseX.value = e.clientX;
        mouseY.value = e.clientY;
    });
};

const handleMouseEnter = () => {
    isHovered.value = true;
};

const handleMouseLeave = () => {
    isHovered.value = false;
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
};

onMounted(() => {
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
});

onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    if (rafId) {
        cancelAnimationFrame(rafId);
    }
});
</script>

<template>
    <div ref="target" class="z-80 w-fit" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
        :style="`will-change: transform; transition: ${!isHovered ? 700 : 0}ms cubic-bezier(0.03, 0.98, 0.52, 0.99); transform: perspective(1000px) rotateX(${-roll}deg) rotateY(${tilt}deg) scale3d(1, 1, 1);`">
        <slot />
    </div>
</template>
