<script setup lang="ts">
useHead({
    htmlAttrs: {
        lang: 'en',
    },
    title: 'Gael Force Robotics',
});

if (import.meta.env.DEV) {
    onMounted(() => {
        document.querySelector('.firebase-emulator-warning')?.addEventListener('click', event => {
            // @ts-ignore
            event.target.remove();
        });
    });
}
</script>

<template>
    <NuxtLayout data-theme="dark">
        <NuxtPage></NuxtPage>
        <ToastContainer />
    </NuxtLayout>
</template>

<style>
/* SIZING DEBUG */

/* * {
    outline: 1px solid red;
} */
</style>