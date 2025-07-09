<script setup lang="ts">
const { mode, disabled } = defineProps<{
    mode: 'add' | 'remove',
    disabled?: boolean
}>();

const extraClasses = computed(() => disabled ? 'text-gray-400 hover:cursor-not-allowed' : (mode === 'remove' ? 'hover:bg-[var(--gfr-red)]' : 'hover:bg-[var(--gfr-blue)]'));
</script>

<template>
    <div :class="`p-2 px-5 bg-base-200 cursor-pointer rounded-lg text-sm duration-300 ${extraClasses}`">
        <span>
            <slot />
        </span>
    </div>
</template>