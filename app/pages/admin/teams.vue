<script setup lang="ts">

const nuxtApp = useNuxtApp();

// Team Form
const teamName = ref('');
const teamLogo = useTemplateRef('team-logo');
const teamLogoPreview = ref('');
const captainSearchTerm = ref('');
const captainsSearchResults = computed((): string[] => {
    return nuxtApp.$firebase.users
        .map(user => user.name)
        .filter(name => (name.toLowerCase().includes(captainSearchTerm.value.toLowerCase()) && !captains.value.includes(name) && name !== ''))
        .slice(0, 3);
});
const captainSearchLabel = computed((): string => {
    if (captainsSearchResults.value.length === 0) return "Can't find that member...";
    else if (captainsSearchResults.value.length > 0 && captainSearchTerm.value !== '') return "Add your captain!";
    else if (captains.value.length === 2) return "Woah no more!";
    return 'Start typing...';;
});
const captains = ref<string[]>([]);

function addCaptain(name: string) {
    if (captains.value.length < 2 && !captains.value.includes(name)) {
        captains.value.push(name);
        captainSearchTerm.value = '';
    };
};

function removeCaptain(name: string) {
    captains.value = captains.value.filter((captain) => captain !== name);
    captainSearchTerm.value = '';
};

function updateTeamLogo() {
    const files = teamLogo.value?.files;
    if (files) {
        teamLogoPreview.value = URL.createObjectURL(files[0]);
    }
};
</script>

<template>
    <div class="flex flex-col gap-3">
        <dialog id="create_team_modal" class="modal">
            <div class="modal-box  w-11/12 max-w-5xl">
                <h3 class="text-xl font-bold">Create Team</h3>
                <div class="divider"></div>
                <p class="text-md mb-3 text-gray-400">Please note that the team shorthand will be used to sync awards and competitions from RobotEvents.</p>
                <div class="flex flex-col gap-1 px-3 pb-3">
                    <div class="flex flex-row col-2">
                        <div>
                            <div class="flex flex-row gap-4 w-full">
                                <fieldset class="fieldset">
                                    <legend class="fieldset-legend">Name</legend>
                                    <input type="text" class="input" placeholder="e.g. Resurgence" v-model="teamName" />
                                    <p class="label">
                                        {{ teamName !== '' ? 'Team shorthand will be 5327' + teamName[0].toUpperCase() : 'Start typing...' }}
                                    </p>
                                </fieldset>
                                <fieldset class="fieldset">
                                    <legend class="fieldset-legend">Team Logo</legend>
                                    <input type="file" class="file-input" ref="team-logo" @change="updateTeamLogo" />
                                    <p class="label">Team logo must be a square</p>
                                </fieldset>
                            </div>

                            <div class="flex flex-row gap-4 w-full">
                                <div class="w-46">
                                    <fieldset class="fieldset">
                                        <legend class="fieldset-legend">Season</legend>
                                        <select class="select">
                                            <option>Push Back</option>
                                            <option>High Stakes</option>
                                            <option>Over Under</option>
                                        </select>
                                        <p class="label">Woah, why a past one?</p>
                                    </fieldset>
                                </div>
                                <div>
                                    <fieldset class="fieldset">
                                        <legend class="fieldset-legend">Captains</legend>
                                        <input type="text" class="input" placeholder="e.g. Aarav" v-model="captainSearchTerm" :disabled="captains.length === 2" />
                                        <p class="label">{{ captainSearchLabel }}</p>
                                    </fieldset>
                                    <div class="w-48">
                                        <div v-for="name in captains" @click="() => removeCaptain(name)" class="p-3 mb-2 min-w-42 bg-base-200 cursor-pointer rounded-lg text-sm hover:bg-error">
                                            {{ name }}
                                        </div>
                                    </div>
                                </div>

                                <div class="h-64 mt-8">
                                    <div v-show="captains.length < 2 && captainSearchTerm !== ''" v-for="name in captainsSearchResults" @click="() => addCaptain(name)"
                                        class="p-3 mb-2 min-w-46 bg-base-200 cursor-pointer rounded-lg text-sm">
                                        {{ name }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="w-48 ml-4 aspect-square rounded-lg bg-base-300 flex items-center justify-center text-gray-600">
                                <span v-if="teamLogoPreview === ''">Preview your logo</span>
                                <NuxtImg v-else :src="teamLogoPreview" width="200" height="200" class="rounded-md" />
                            </div>

                        </div>
                    </div>

                    <div class="flex justify-end gap-3 flex-row">
                        <form method="dialog" class="m-0 p-0">
                            <button class="btn">Cancel</button>
                        </form>
                        <button class="btn bg-blue-500">Create</button>
                    </div>
                    <!-- <div class="toast toast-top toast-end">
                        <div class="alert alert-info">
                            <span>New mail arrived.</span>
                        </div>
                        <div class="alert alert-success">
                            <span>Message sent successfully.</span>
                        </div>
                    </div> -->
                </div>
            </div>
        </dialog>
        <div>
            <button class="btn mr-2" onclick="create_team_modal.showModal()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                New Team
            </button>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div v-for="i in Array(4)" class="flex gap-3 p-4 bg-base-200 hover:bg-base-300 cursor-pointer duration-300 rounded-lg team-card">
                <div>
                    <NuxtImg src="RLogo.png" width="100" height="100" class="rounded-md select-none" />
                </div>
                <div class="w-full text-gray-300">
                    <div class="flex items-center justify-between text-white">
                        <h1 class="font-bold text-lg">Resurgence</h1>
                        <button class="btn btn-ghost btn-square hover:text-gray-400 invisible">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </button>
                    </div>
                    <div>
                        <h1 class="font-semibold">
                            <span>Saketh Chakravadhanula & Rishi Shirol</span>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>