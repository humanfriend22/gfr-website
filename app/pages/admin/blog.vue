<script setup lang="ts">
definePageMeta({
    layout: 'admin'
});

const creating = ref(false);
const editingBlog = ref<Blog>({
    id: '', // Document IDs
    title: '',
    author: '',
    description: '',
    content: '',
    image: '',
    images: [],
    date: new Date(),
    location: '',
    signup_link: '',
    volunteer_link: ''
});
const initialMarkdown = ref('');

function launchCreateBlogModal() {
    if (!isCurrentPresident.value
        && !(currentOfficerPosition.value?.includes('pred'))
        && !(currentOfficerPosition.value === 'secretary')) return;

    creating.value = true;
    editingBlog.value = {
        id: '', // Document IDs
        title: '',
        author: '',
        description: '',
        content: '',
        image: '',
        images: [],
        date: new Date(),
        location: '',
        signup_link: '',
        volunteer_link: ''
    };
    initialMarkdown.value = '';
    const modal = document.getElementById('edit_blog_modal') as HTMLDialogElement;
    modal.showModal();
};

async function launchEditBlogModal(blog: Blog) {
    if (!isCurrentPresident.value
        && !(currentOfficerPosition.value?.includes('pred'))
        && !(currentOfficerPosition.value === 'secretary')) return;

    creating.value = false;
    editingBlog.value = { ...blog };
    const modal = document.getElementById('edit_blog_modal') as HTMLDialogElement;
    modal.showModal();
    initialMarkdown.value = await (await fetch(blog.content)).text();
    console.log(initialMarkdown.value);
}

onMounted(async () => {
    await updateBlogs(true);
});
</script>

<template>
    <Section class="px-5 flex flex-col gap-3">
        <ClientOnly>
            <ModalsEditBlog :blog="editingBlog" :creating="creating" :initial-markdown="initialMarkdown" />
        </ClientOnly>

        <h1 class="text-2xl font-bold">Blog</h1>
        <p class="text-gray-500">Write blog posts on behalf of GFR.</p>
        <div>
            <button class="btn bg-gfr-blue" @click="launchCreateBlogModal">Create New Blog</button>
        </div>
        <div class="w-1/2">
            <BlogPreviewCard :index="0" :blog="blog" :preview-mode="true" v-for="blog of blogs" :click-handler="launchEditBlogModal" />
        </div>
    </Section>
</template>