<script setup lang="ts">
import type { SeasonOfficerMap } from '@/plugins/firebase.client';
import debounce from 'debounce';

const app = useNuxtApp();

const officers = ref<{ [key: string]: string }>({
    president: '',
    vice_president: '',
    secretary: '',
    treasurer: '',
    senior_pred: '',
    junior_pred: ''
});

const positionsMap: { [key: string]: string } = {
    president: 'President',
    vice_president: 'Vice President',
    secretary: 'Secretary',
    treasurer: 'Treasurer',
    senior_pred: 'Senior PRED',
    junior_pred: 'Junior PRED'
};

const currentPosition = ref('president');
const officerSearchTerm = ref('');
const officerSearchResults = computed(() => {
    return app.$firebase.users
        .filter(user => (user.name.toLowerCase().includes(officerSearchTerm.value.toLowerCase()) && !Object.values(officers.value).includes(user.name)))
        .slice(0, 3);
});
const seasonName = ref('');
const seasonLogo = useTemplateRef('season-logo');
const seasonLogoPreview = ref('');
const seasonIDLabel = computed(() => {
    // Override
    const thisYear = new Date().getFullYear();
    const suffix = `${thisYear - 2000}${thisYear - 1999}`;
    if (seasonName.value.endsWith(suffix)) {
        return `Season ID will be "${seasonName.value}"`;
    };

    const words = seasonName.value.split(' ');
    if (words.length !== 2) {
        return "It's two words...";
    };

    const seasonID = words.join('').toLowerCase() + suffix;
    return `Season ID will be "${seasonID}"`;
});

function addOfficer(name: string) {
    if (!Object.values(officers.value).includes(name) && officers.value[currentPosition.value] === '') {
        officers.value[currentPosition.value] = name;
        officerSearchTerm.value = '';
    }
};

function updateSeasonLogo() {
    const files = seasonLogo.value?.files;
    if (files) {
        seasonLogoPreview.value = URL.createObjectURL(files[0]);
    }
};
</script>

<template>
    <div class="flex flex-col gap-3">
        <dialog id="create_season_modal" class="modal">
            <div class="modal-box  w-11/12 max-w-5xl">
                <h3 class="text-xl font-bold">Create Season</h3>
                <div class="divider"></div>
                <p class="text-md mb-3 text-gray-400"></p>
                <div class="flex flex-col gap-3 px-3 pb-3">
                    <div class="flex w-full">
                        <div class="grow w-1/2">
                            <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                                <table class="table table-pin-cols">
                                    <!-- head -->
                                    <thead>
                                        <tr>
                                            <td>Position</td>
                                            <td>Person</td>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- row 1 -->
                                        <tr v-for="positionKey in Object.keys(positionsMap)">
                                            <td>
                                                <div :class="'hover:text-blue-500 duration-300 cursor-pointer ' + (currentPosition === positionKey ? 'text-blue-500' : '')"
                                                    @click="() => currentPosition = positionKey">{{ positionsMap[positionKey] }}</div>
                                            </td>
                                            <td>{{ officers[positionKey] }}</td>
                                            <th>
                                                <div class="float-right">
                                                    <button :class="'btn btn-square btn-sm ' + (officers[positionKey] == '' ? 'btn-disabled' : '')" @click="() => officers[positionKey] = ''">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="divider divider-horizontal"></div>
                        <div class="grow w-1/2">
                            <h1 class="font-bold text-xl">Search For {{ positionsMap[currentPosition] }}</h1>
                            <label class="input my-3">
                                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.3-4.3"></path>
                                    </g>
                                </svg>
                                <input type="text" v-model="officerSearchTerm" required placeholder="Search" />
                            </label>
                            <div class="h-36">
                                <div v-for="user of officerSearchResults" @click="() => addOfficer(user.name)" class="p-3 mb-2 min-w-46 bg-base-200 cursor-pointer rounded-lg text-sm">
                                    {{ user.name }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <div>
                            <fieldset class="fieldset">
                                <legend class="fieldset-legend">Name</legend>
                                <input type="text" class="input" placeholder="e.g. High Stakes" v-model="seasonName" maxlength="15" />
                                <p class="label">
                                    {{ seasonIDLabel }}
                                </p>
                            </fieldset>
                            <fieldset class="fieldset">
                                <legend class="fieldset-legend">Season Logo</legend>
                                <input type="file" class="file-input" ref="season-logo" @change="updateSeasonLogo" />
                                <p class="label">Season logo must be a square</p>
                            </fieldset>
                        </div>
                        <div class="aspect-square h-32 rounded-lg bg-base-300 flex items-center justify-center text-gray-600">
                            <span v-if="seasonLogoPreview === ''">Preview your logo</span>
                            <NuxtImg v-else :src="seasonLogoPreview" width="50" height="50" class="rounded-md" />
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
            <button class="btn mr-2" onclick="create_season_modal.showModal()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                New Season
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