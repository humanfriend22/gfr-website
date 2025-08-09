<script setup lang="ts">
onMounted(async () => {
    await updateBlogs();
});
</script>

<template>
    <Section>
        <div class="flex flex-col justify-center items-center gap-y-5 px-4 h-fit">
            <div class="text-5xl font-bold mt-10">Read our <span class="gfr-gradient">Blog</span></div>
            <div class="text-center text-gray-400 text-lg">
                <p>Learn more about our club and get monthly insights into our Competition Teams!</p>
            </div>

            <Divider />

            <div class=" lg:flex flex-col w-full h-fit">
                <BlogPreviewCard :index="blogs.indexOf(blog)" :blog="blog" v-for="blog of blogs" :click-handler="(blog: Blog) => navigateTo('/blog/' + blog.id)" />
            </div>
        </div>
    </Section>
</template>