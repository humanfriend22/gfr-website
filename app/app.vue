<script setup lang="ts">
useHead({
    htmlAttrs: {
        lang: 'en',
    },
});
useSeoMeta({
    title: 'Gael Force Robotics',
    description: 'Gael Force Robotics is a high school VEX robotics team based in Dublin, California that has been competing since 2010. We are a student-led team that focuses on building robots, mentoring younger students, and giving back to the community.',
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