<script setup lang="ts">
import { getDownloadURL, getMetadata, listAll, ref as storageRef } from 'firebase/storage'

definePageMeta({
    layout: 'admin'
});

const previewUrl = ref('');
const previewName = ref('');
const images = ref<{
    name: string;
    path: string;
    dateUploaded: string;
}[]>([]);

async function fetchPreviewImage(path: string) {
    previewName.value = path.split('/').pop() || 'Unknown';
    previewUrl.value = await getDownloadURL(storageRef(storage.value!, path));
};

onMounted(async () => {

    const listRef = storageRef(storage.value!, 'teams');
    const result = await listAll(listRef);
    result.items.map(async (item) => {
        images.value.push({
            name: item.name,
            path: item.fullPath,
            dateUploaded: (await getMetadata(item)).updated
        });
    });
});
</script>

<template>
    <Section class="flex flex-col gap-2 px-5">
        <dialog id="image_preview" class="modal">
            <div class="modal-box">
                <h3 class="text-lg font-bold">Preview "{{ previewName }}"</h3>
                <img :src="previewUrl" alt="Preview the image" class="w-48 h-48">
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>

        <h1 class="text-2xl font-bold">Files</h1>
        <p class="text-gray-400">Here is every file uploaded to this website.</p>
        <div class="max-w-[40rem] min-h-24 max-h-[70vh] rounded-box border border-base-content/5 flex flex-col justify-center">
            <div class="p-5" v-if="images.length === 0">
                <div class="flex flex-row gap-2 justify-center">
                    <div class="loading"></div>Fetching file data...
                </div>
            </div>
            <table class="table table-md table-pin-rows" v-else>
                <!-- head -->
                <thead class="bg-[var(--primary-background-color)]">
                    <tr>
                        <th class="bg-neutral-950">Name</th>
                        <th class="bg-neutral-950">Usage</th>
                        <th class="bg-neutral-950">Date Uploaded</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="image of images" :key="image.name" @click="fetchPreviewImage(image.path)">
                        <td class="underline hover:text-[var(--gfr-blue)] duration-300 cursor-pointer" onclick="image_preview.show()">{{ image.name }}</td>
                        <td>{{ image.path }}</td>
                        <td>{{ image.dateUploaded }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Section>
</template>