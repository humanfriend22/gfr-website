<script setup lang="ts">
const { disabled, to } = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    to: {
        type: String,
        default: '/'
    }
});

function navigate() {
    if (!disabled) {
        useRouter().push(to);
    }
};
</script>

<template>
    <div :class="'mx-4 text-lg font-[550] tracking-wide duration-300 select-none ' + (disabled ? 'text-gray-400 hover:cursor-not-allowed' : 'text-white hover:cursor-pointer hover:text-[var(--gfr-red)]')"
        @click="navigate">
        <slot />
    </div>
</template>