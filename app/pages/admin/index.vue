<script setup lang="ts">
import { doc, updateDoc } from 'firebase/firestore';

definePageMeta({
    layout: 'admin'
});

const savingSite = ref(false);
async function saveSite() {
    savingSite.value = true;
    await updateDoc(doc(firestore.value!, 'site', 'site'), {
        bannerMarkdown: site.value.bannerMarkdown,
    });
    savingSite.value = false;
}

function launchHomeImageModal() {
    const modal = document.getElementById('home_image_modal') as HTMLDialogElement;
    modal.showModal();
};

function launchEditStepsModal() {
    const modal = document.getElementById('edit_steps_modal') as HTMLDialogElement;
    modal.showModal();
};
</script>

<template>
    <Section class="px-5 flex flex-col gap-5">
        <ClientOnly>
            <ModalsEditSteps />
            <ModalsHomeImage :src="site.homeImage" />
        </ClientOnly>

        <h1 class="text-4xl font-bold">Welcome!</h1>
        <div class="flex flex-row gap-4">
            <ClientOnly>
                <ModalsEditUserContent :for-owner="true" v-if="currentUserData" :user="currentUserData">
                    Manage Account
                </ModalsEditUserContent>
                <div class="w-100 h-100 box flex flex-col justify-between" v-if="isCurrentPresident">
                    <div>
                        <h1 class="font-bold">Site Settings</h1>
                        <p class="mt-2 text-gray-500 text-sm">You can use links, bold, and italics in Markdown below to display in the page banner. Leaving it blank will disable it.</p>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Banner Markdown</legend>
                            <input type="text" class="input" placeholder="e.g. **Bold** *Italics*" v-model="site.bannerMarkdown" />
                        </fieldset>
                        <button class="btn" @click="launchHomeImageModal">Edit Home Image</button>
                        <button class="btn ml-1" @click="launchEditStepsModal">Edit "Join Us" Steps</button>
                    </div>
                    <div>
                        <button class="btn bg-gfr-blue float-right" @click="saveSite" :disabled="savingSite">Save</button>
                    </div>
                </div>
            </ClientOnly>
        </div>
    </Section>
</template>