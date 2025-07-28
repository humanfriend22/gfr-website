<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef, uploadBytes, uploadString } from 'firebase/storage';
import { marked } from 'marked';
import type { ShallowRef } from 'vue';

const { blog, creating } = defineProps<{
    blog: Blog;
    creating?: boolean;
    initialMarkdown: string;
}>();

const saving = ref(false);
const errorMessage = computed(() => {
    if (blog.title.length < 5 || blog.title.length > 30) return 'Invalid title (5-30 characters)';
    if (blog.description.length < 10 || blog.description.length > 200) return 'Invalid description (10-200 characters)';
    if (blog.author.length < 5 || blog.author.length > 30) return 'Invalid author (5-30 characters)';
    if (blog.date.toString() === 'Invalid Date') return 'Invalid date';
    if (content.value.length < 10 || content.value.length > 10000) return 'Invalid content (10-10000 characters)';
    if (blog.image === '') return 'Please upload an image.';
    const idCheck = isValidBlogEventId(blog.id);
    if (idCheck !== '') return idCheck;
    if (creating && !!blogs.value.find(b => b.id === blog.id)) return 'Blog ID must be unique!';
    return '';
});

function updateBlogId() {
    if (!creating) return;
    blog.id = blog.title.toLowerCase().replaceAll(' ', '-');
};

const image = useTemplateRef('image');
function updateImagePreview() {
    const files = image.value?.files;
    if (files && files.length > 0) {
        blog.image = URL.createObjectURL(files[0]);
    };
};

const rawDate = ref('');
watch(rawDate, (newValue) => {
    blog.date = new Date(newValue);
});


function readObjectURLFromImage(image: Readonly<ShallowRef<HTMLInputElement | null>>) {
    const files = image.value?.files;
    if (files && files.length > 0) {
        return URL.createObjectURL(files[0]);
    }
    return '';
}

const image1 = useTemplateRef('image1'),
    image2 = useTemplateRef('image2'),
    image3 = useTemplateRef('image3'),
    image4 = useTemplateRef('image4'),
    image5 = useTemplateRef('image5');
const rawMarkdown = useLocalStorage('blog-draft', '');
const content = ref('');
watchEffect(async () => {
    content.value = await renderBlogMarkdown(preFormatBlogMarkdown(rawMarkdown.value, [
        readObjectURLFromImage(image1),
        readObjectURLFromImage(image2),
        readObjectURLFromImage(image3),
        readObjectURLFromImage(image4),
        readObjectURLFromImage(image5)
    ]));
});

async function save() {
    saving.value = true;

    // Cover Image
    if (blog.image !== '') {
        await uploadImage(image, `blogs/${blog.id}/cover`);
    };

    // Suplementary Images
    const images = await Promise.all([
        uploadImage(image1, `blogs/${blog.id}/image1`),
        uploadImage(image2, `blogs/${blog.id}/image2`),
        uploadImage(image3, `blogs/${blog.id}/image3`),
        uploadImage(image4, `blogs/${blog.id}/image4`),
        uploadImage(image5, `blogs/${blog.id}/image5`)
    ]);

    // Content
    const contentReference = storageRef(storage.value!, `blogs/${blog.id}/content.md`);
    const markdown = preFormatBlogMarkdown(rawMarkdown.value, images);
    await uploadString(contentReference, markdown);

    const newBlog = {
        ...blog,
        content: await getDownloadURL(contentReference),
        images
    };

    const documentRef = doc(firestore.value!, 'blogs', blog.id);
    if (creating) {
        try {
            await setDoc(documentRef, newBlog);
        } catch (err) {
            console.error('Error creating event:', err);
        };
    } else {
        await updateDoc(documentRef, newBlog);
    };

    blogs.value = blogs.value.map(b => b.id === blog.id ? newBlog : b);

    saving.value = false;
    // @ts-ignore
    document.getElementById('edit_blog_modal')?.close();
};

const pastContentLink = ref('');
onBeforeUpdate(async () => {
    if (pastContentLink.value !== blog.content) {
        if (creating) {
            rawMarkdown.value = '';
            pastContentLink.value = '';
            rawDate.value = '';
        } else {
            rawMarkdown.value = await (await fetch(blog.content)).text();
            pastContentLink.value = blog.content;
            rawDate.value = blog.date.toISOString().split('T')[0];
        };
    }
});

const currentTab = ref<'metadata' | 'images' | 'content'>('metadata');

onMounted(() => {
    if (creating) {
        rawMarkdown.value = '';
        rawDate.value = '';
    };
});
</script>

<template>
    <dialog id="edit_blog_modal" class="modal">
        <div class="modal-box w-11/12 max-w-[var(--container-7xl)] h-[var(--container-3xl)] flex flex-col">
            <h3 class="text-lg font-bold">{{ creating ? 'Create' : 'Edit' }} Blog</h3>
            <div class="flex-1">
                <div class="grid grid-cols-2 gap-6">

                    <div>
                        <div role="tablist" class="tabs tabs-box flex flex-row mt-2">
                            <a role="tab" @click="currentTab = 'metadata'" :class="'tab flex-1 ' + (currentTab === 'metadata' ? 'tab-active' : '')">Metadata</a>
                            <a role="tab" @click="currentTab = 'images'" :class="'tab flex-1 ' + (currentTab === 'images' ? 'tab-active' : '')">Images</a>
                            <a role="tab" @click="currentTab = 'content'" :class="'tab flex-1 ' + (currentTab === 'content' ? 'tab-active' : '')">Content</a>
                        </div>
                        <div v-show="currentTab === 'metadata'">
                            <div class="grid grid-cols-2 gap-2">
                                <fieldset class="fieldset">
                                    <legend class="fieldset-legend">Title</legend>
                                    <input type="text" class="input w-full" placeholder="Type here" v-model="blog.title" @change="updateBlogId" />
                                </fieldset>
                                <fieldset class="fieldset">
                                    <legend class="fieldset-legend">ID</legend>
                                    <input type="text" class="input w-full" placeholder="Type here" :disabled="!creating" v-model="blog.id" />
                                    <div class="label text-wrap">Must be unique across all blogs! Cannot be changed after creation!</div>
                                </fieldset>
                            </div>

                            <div class="grid grid-cols-2 gap-2">
                                <div class="flex flex-col">
                                    <fieldset class="fieldset">
                                        <legend class="fieldset-legend">Author</legend>
                                        <input type="text" class="input w-full" placeholder="Type here" v-model="blog.author" />
                                    </fieldset>
                                    <fieldset class="fieldset">
                                        <legend class="fieldset-legend">Date</legend>
                                        <input type="date" class="input w-full" v-model="rawDate" />
                                        <p class="label">This will determine blog sorting!</p>
                                    </fieldset>
                                    <fieldset class="fieldset">
                                        <legend class="fieldset-legend">Image</legend>
                                        <input type="file" accept=".png,.jpg,.jpeg" class="file-input w-full" ref="image" @change="updateImagePreview" />
                                        <p class="label">Preview will update below.</p>
                                    </fieldset>
                                </div>
                                <div>
                                    <fieldset class="fieldset">
                                        <legend class="fieldset-legend">Description</legend>
                                        <textarea class="textarea h-35 w-full" placeholder="Shown on blog preview" v-model="blog.description" />
                                        <div class="label">You can use markdown!</div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div v-show="currentTab === 'images'">
                            <div class="grid grid-cols-2 gap-2">
                                <fieldset class="fieldset">
                                    <legend class="fieldset-legend">Image 1</legend>
                                    <input type="file" accept=".png,.jpg,.jpeg" class="file-input w-full" ref="image1" />
                                </fieldset>
                                <fieldset class="fieldset">
                                    <legend class="fieldset-legend">Image 2</legend>
                                    <input type="file" accept=".png,.jpg,.jpeg" class="file-input w-full" ref="image2" />
                                </fieldset>
                                <fieldset class="fieldset">
                                    <legend class="fieldset-legend">Image 3</legend>
                                    <input type="file" accept=".png,.jpg,.jpeg" class="file-input w-full" ref="image3" />
                                </fieldset>
                                <fieldset class="fieldset">
                                    <legend class="fieldset-legend">Image 4</legend>
                                    <input type="file" accept=".png,.jpg,.jpeg" class="file-input w-full" ref="image4" />
                                </fieldset>
                                <fieldset class="fieldset">
                                    <legend class="fieldset-legend">Image 5</legend>
                                    <input type="file" accept=".png,.jpg,.jpeg" class="file-input w-full" ref="image5" />
                                </fieldset>
                            </div>
                            <p class="mt-2">Write images as usual in Markdown syntax but for the url, enter <code>{image1}</code> to use a custom image that you uploaded here. Of course,
                                change the number
                                for other images. For example to use image 3, you would enter <br><br>
                                <code>![Your image caption here]({image3})</code>
                            </p>
                        </div>
                        <div v-show="currentTab === 'content'">
                            <fieldset class="fieldset">
                                <legend class="fieldset-legend">Content</legend>
                                <textarea class="textarea h-60 w-full" placeholder="Use markdown!" v-model="rawMarkdown" />
                                <div class="label">Preview will appear on the right.</div>
                            </fieldset>
                        </div>


                    </div>
                    <div class="border-1 rounded-md p-3 h-[65vh] overflow-scroll" style="border-color: hsl(212deg 10% 31%);">
                        <BlogDisplay :blog="blog" :content="content" :width-percentage="30" />
                    </div>
                </div>
            </div>

            <div class="modal-action flex flex-row justify-between">
                <div class="flex flex-col justify-center">
                    <span class="text-base text-red-500">{{ errorMessage }}</span>
                </div>
                <div class="flex flex-row gap-2">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn" ref="close">Cancel</button>
                    </form>
                    <button class=" btn bg-[var(--gfr-blue)]" @click="save" :disabled="saving || errorMessage !== ''">
                        <span class="loading" v-if="saving"></span>
                        {{ saving ? 'Saving...' : 'Save' }}
                    </button>
                </div>
            </div>
        </div>
    </dialog>
</template>