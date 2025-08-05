<script setup lang="ts">
import { doc, updateDoc } from 'firebase/firestore';
import {
    getDownloadURL,
    uploadBytes,
    ref as storageRef, type StorageReference,
} from 'firebase/storage';

const { src } = defineProps<{
    src: string;
}>();

const input = useTemplateRef('input');
const previewSrc = ref(src);
function updatePreview() {
    const files = input.value?.files;
    if (files && files.length > 0) {
        previewSrc.value = URL.createObjectURL(files[0]);
    };
};

const saving = ref(false);
async function save() {
    saving.value = true;

    // let i = 0;
    // if (site.value.homeImage !== '') {
    //     const u = new URL(site.value.homeImage);
    //     i = parseInt(u.pathname.split('/').pop()!.split('.')[0].split('').pop()!) || 0;
    // }

    if (input.value?.files) {
        // const file = input.value.files[0];
        // const reference = storageRef(storage.value!, `site/home.` + file.name.split('.').pop());
        // await uploadBytes(reference, file);
        previewSrc.value = await uploadImage(input, `site/home`);
        await updateDoc(doc(firestore.value!, 'site', 'site'), {
            homeImage: previewSrc.value,
        });
        site.value.homeImage = previewSrc.value;
    };

    saving.value = false;
    // @ts-ignore
    document.getElementById('home_image_modal')?.close();
};
</script>

<template>
    <dialog id="home_image_modal" class="modal">
        <div class="modal-box w-11/12 max-w-[var(--container-3xl)] h-[var(--container-3xl)]">
            <h3 class="text-lg font-bold">Preview Modal</h3>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Home Image</legend>
                <input type="file" class="file-input" ref="input" @change="updatePreview" />
            </fieldset>
            <div class="p-10">
                <ClientOnly>
                    <Tilt :repel-at-mouse="false" :horizontal-tilt-angle="30" :vertical-tilt-angle="30">
                        <NuxtImg class="rounded-lg ring-4 ring-gray-700" :src="previewSrc" alt="" priority />
                    </Tilt>
                </ClientOnly>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
                <button class="btn bg-gfr-blue" @click="save" :disabled="saving">Save</button>
            </div>
        </div>
    </dialog>
</template>