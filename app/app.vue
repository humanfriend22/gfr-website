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

onMounted(() => {
    if (import.meta.env.DEV) {
        document.querySelector('.firebase-emulator-warning')?.addEventListener('click', event => {
            // @ts-ignore
            event.target.remove();
        });
    };

    // COMMIT CHECK - refresh all cache if a new build was deployed
    const commit = useRuntimeConfig().public.gitCommit;
    const oldCommit = localStorage.getItem('commit') || '';
    console.log('Old commit:', oldCommit);
    console.log('New commit:', commit);
    if (commit !== oldCommit && commit !== 'dev' && commit.length > 0) {
        console.warn('COMMIT CHANGED. ERASING LOCAL STORAGE');
        localStorage.clear();
        localStorage.setItem('commit', commit);
    }
})
</script>

<template>
    <NuxtLayout data-theme="dark">
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>