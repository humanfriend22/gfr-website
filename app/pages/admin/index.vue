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
        programs: site.value.programs,
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
                <ModalsEditUserContent :for-owner="true" v-if="currentUserData" :user="currentUserData" class="h-fit">
                    Manage Account
                </ModalsEditUserContent>
                <div class="w-130 h-fit box flex flex-col justify-between" v-if="isCurrentPresident || isCurrentVicePresident || isCurrentPREDorSecretary">
                    <div>
                        <h1 class="font-bold">Landing Page</h1>
                        <p class="mt-2 text-gray-500 text-sm">You can use links, bold, and italics in Markdown below to display in the page banner. Leaving it blank will disable it.</p>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Banner Markdown</legend>
                            <input type="text" class="input" placeholder="e.g. **Bold** *Italics*" v-model="site.bannerMarkdown" />
                        </fieldset>
                        <button class="btn" @click="launchHomeImageModal">Edit Home Image</button>
                        <button class="btn ml-1" @click="launchEditStepsModal">Edit "Join Us" Steps</button>
                    </div>
                    <div class="h-full overflow-scroll w-full mt-2">
                        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full table-pin-rows">
                            <table class="table">
                                <!-- head -->
                                <thead>
                                    <tr>
                                        <th>Program</th>
                                        <th>Blog ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="[i] of site.programs?.entries()">
                                        <th>{{ i + 1 }}</th>
                                        <td><input type="text" placeholder="Type here" class="input" v-model="site.programs[i]" :disabled="i > 0 && site.programs[i - 1] === ''" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <button class="btn bg-gfr-blue float-right" @click="saveSite" :disabled="savingSite">Save</button>
                    </div>
                </div>
                <div class="w-130 h-fit box flex flex-col justify-between" v-if="false && isCurrentPresident || isCurrentPREDorSecretary">
                    <div>
                        <h1 class="font-bold">Contact Info</h1>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Club Email</legend>
                            <input type="text" class="input" placeholder="e.g. **Bold** *Italics*" v-model="site.bannerMarkdown" />
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">President Email</legend>
                            <input type="text" class="input" placeholder="e.g. **Bold** *Italics*" v-model="site.bannerMarkdown" />
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Vice President Email</legend>
                            <input type="text" class="input" placeholder="e.g. **Bold** *Italics*" v-model="site.bannerMarkdown" />
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Club Advisor</legend>
                            <input type="text" class="input" placeholder="e.g. **Bold** *Italics*" v-model="site.bannerMarkdown" />
                        </fieldset>
                    </div>
                    <div>
                        <button class="btn bg-gfr-blue float-right" @click="saveSite" :disabled="savingSite">Save</button>
                    </div>
                </div>
            </ClientOnly>
        </div>
    </Section>
</template>