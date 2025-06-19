<script setup lang="ts">
defineProps({
    center: {
        type: Boolean,
        default: true
    }
})
</script>

<template>
    <div :class="'w-3/4 h-0 relative ' + (center ? 'mx-auto' : '')">
        <div class="w-full h-0 left-0 top-0 absolute outline-1 outline-offset-[-0.50px] outline-gray-400"></div>
    </div>
</template>