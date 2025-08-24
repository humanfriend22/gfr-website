<script setup lang="ts">
defineProps<{
    link: string;
}>();
</script>

<template>
    <NuxtLink class="link hover:text-blue-500 duration-200 no-underline" :to="link">
        <slot />
    </NuxtLink>

</template>