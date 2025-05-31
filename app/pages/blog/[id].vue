<script setup lang="ts">

const postId = useRoute().path.replace('/blog/', '');

const { data: home } = await useAsyncData(() => queryCollection('content').path('/' + postId).first())

useSeoMeta({
    title: home.value?.title,
    description: home.value?.description
})
</script>

<template>
    <div class="prose">
        <ContentRenderer v-if="home" :value="home" />
        <div v-else>Home not found</div>
    </div>

</template>