<script setup lang="ts">
defineProps<{
    rootClass?: string;
    class?: string;
    message?: string;
}>();
</script>

<template>
    <section :class="'max-w-screen-xl w-full min-h-full h-auto mx-auto z-20 ' + (rootClass ? rootClass : '')">
        <div class="w-full h-full flex justify-center items-center" v-if="message">
            <p>{{ message }}</p>
        </div>
        <div :class="class" v-if="!message">
            <slot />
        </div>
    </section>
</template>

<style></style>