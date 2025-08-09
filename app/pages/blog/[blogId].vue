<script setup lang="ts">
const { blogId } = useRoute().params;

import { marked } from 'marked';

const blog = computed(() => blogs.value.find(blog => blog.id === blogId)!);
const content = ref('');
onMounted(async () => {
    if (!blog.value) {
        navigateTo('/blog');
        return;
    };
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
    const markdown = await fetchBlogContent(blog.value.id, blog.value.content);
    content.value = await marked.parse(markdown, {
        gfm: true,
        breaks: true
    });
});
</script>

<template>
    <Section>
        <BlogDisplay :blog="blog" :content="content" class="w-5/6 md:w-3/5" />
    </Section>
</template>