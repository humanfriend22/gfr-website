<script setup lang="ts">
const { disabled, to } = defineProps<{
    disabled?: boolean;
    to?: string;
}>();

function navigate() {
    if (!disabled) {
        useRouter().push(to || '/');
    }
};
</script>

<template>
    <div :class="'text-lg font-[550] tracking-wide duration-300 select-none ' + (disabled ? 'text-gray-400 hover:cursor-not-allowed' : 'text-white hover:cursor-pointer hover:text-gfr-red')"
        @click="navigate">
        <slot />
    </div>
</template>