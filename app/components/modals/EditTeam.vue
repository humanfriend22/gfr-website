<script setup lang="ts">
import { ModalsUserMiniCard } from '#components';
import { templateRef } from '@vueuse/core';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { capitalize } from 'vue';

const { team, seasonId, creating, allowedLetters } = defineProps<{
    team: Team,
    seasonId: string,
    creating: boolean,
    allowedLetters: string[]
}>();

const saving = ref(false);
const errorMessage = computed(() => {
    if (team.name.length > 20) return 'Invalid team name (max 20 characters)';
    if (team.captains.length < 1 || team.captains.length > 2) return '1-2 Captains required';
    if (team.members.length < 1 || team.members.length > 20) return '1-20 Members required';
    return '';
});

// Logo
const logo = useTemplateRef('logo');
const logoPreviewSrc = ref('https://placehold.co/400x400');
function updateLogoPreview() {
    const files = logo.value?.files;
    if (files && files.length > 0) {
        logoPreviewSrc.value = URL.createObjectURL(files[0]);
    };
};

// Captains & Members
const searchMode = ref<'captains' | 'members'>('members');
const searchTerm = ref('');
const searchResults = ref<User[]>([]);

function addUser(user: User) {
    if (searchMode.value === 'captains') {
        if (team.captains.length >= 2) {
            return; // thats enough
        }
        team.captains.push(user.uid);
    } else {
        team.members.push(user.uid);
    }
    searchTerm.value = '';
};

function removeCaptain(uid: string) {
    if (searchMode.value === 'captains') team.captains = team.captains.filter(c => c !== uid);
};
function removeMember(uid: string) {
    if (searchMode.value === 'members') team.members = team.members.filter(m => m !== uid);
};

watch(searchTerm, term => {
    if (term.length < 2) {
        searchResults.value = [];
        return;
    }
    const results = users.value.filter(user => {
        return user.name.toLowerCase().includes(term.toLowerCase()) &&
            !team.captains.includes(user.uid) &&
            !team.members.includes(user.uid);
    });
    searchResults.value = results.slice(0, 3); // Limit to 5 results
});

const closeButton = useTemplateRef('close');
async function save() {
    if (errorMessage.value !== '') {
        console.error('Cannot save team due to validation errors:', errorMessage.value);
        return;
    }
    saving.value = true;
    const teamDoc = doc(firestore.value!, 'seasons', seasonId, 'teams', team.letter);
    try {
        const seasonIndex = seasons.value.findIndex(season => season.id === seasonId);
        if (creating) {
            await setDoc(teamDoc, {
                name: team.name === '' ? `5327${team.letter}` : team.name,
                letter: team.letter,
                logo: logoPreviewSrc.value,
                reId: '',
                captains: team.captains,
                members: team.members,
                competitions: {}
            });

            seasons.value[seasonIndex].teams.push({
                name: team.name === '' ? `5327${team.letter}` : team.name,
                letter: team.letter,
                logo: logoPreviewSrc.value,
                reId: '',
                captains: team.captains,
                members: team.members,
                competitions: {}
            });
        } else {
            await updateDoc(teamDoc, {
                name: team.name === '' ? `5327${team.letter}` : team.name,
                captains: team.captains,
                members: team.members
            });

            const teamIndex = seasons.value[seasonIndex].teams.findIndex(oldTeam => oldTeam.letter === team.letter);
            seasons.value[seasonIndex].teams[teamIndex] = { ...team };
        };

    } catch (error) {
        console.error(error);
    } finally {
        saving.value = false;
        closeButton.value?.click();
    }
};
</script>

<template>
    <dialog id="edit_team_modal" class="modal">
        <div class="modal-box w-11/12 max-w-[var(--container-3xl)] h-[var(--container-3xl)] flex flex-col">
            <h3 class="text-lg font-bold">{{ creating ? 'Create' : 'Edit' }} Team</h3>
            <div class="flex-1">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <fieldset class="fieldset" v-if="creating">
                            <legend class="fieldset-legend">Letter</legend>
                            <select class="select" v-model="team.letter">
                                <option disabled selected>Pick a team letter</option>
                                <option v-for="letter of allowedLetters" :value="letter.toUpperCase()">{{ letter.toUpperCase() }}</option>
                            </select>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Name</legend>
                            <input type="text" class="input" placeholder="Type here" v-model="team.name" />
                            <p class="label">Leave blank to use 5327{{ team.letter.toUpperCase() }}</p>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Logo</legend>
                            <input type="file" class="file-input" ref="logo" @change="updateLogoPreview" />
                            <p class="label">Preview will update below.</p>
                        </fieldset>
                        <TeamLogoDisplay :src="logoPreviewSrc" class="w-48 h-48 my-2 rounded-box"></TeamLogoDisplay>

                    </div>
                    <div class="flex flex-col gap-2">
                        <div role="tablist" class="tabs tabs-box flex flex-row mt-7 mb-4" v-if="isCurrentPresident">
                            <a role="tab" @click="searchMode = 'captains'" :class="'tab flex-1 ' + (searchMode === 'captains' ? 'tab-active' : '')">Captains</a>
                            <a role="tab" @click="searchMode = 'members'" :class="'tab flex-1 ' + (searchMode === 'members' ? 'tab-active' : '')">Members</a>
                        </div>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Search For {{ capitalize(searchMode) }}</legend>
                            <label class="input">
                                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.3-4.3"></path>
                                    </g>
                                </svg>
                                <input type="text" class="grow" placeholder="Search users..." v-model="searchTerm" />
                            </label>
                        </fieldset>
                        <div class="h-36 relative">
                            <ModalsUserMiniCard v-for="user of searchResults" @click="addUser(user)" mode="add" class="mb-2" v-show="searchResults.length > 0">
                                {{ user.name }}
                            </ModalsUserMiniCard>
                            <p v-show="searchResults.length === 0" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-sm w-full text-gray-400 italic">
                                Search users...
                            </p>
                        </div>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Captains</legend>
                            <div class="grid grid-cols-2 gap-2">
                                <ModalsUserMiniCard v-for="uid of team.captains" mode="remove" :disabled="searchMode !== 'captains'" @click="removeCaptain(uid)">
                                    {{ userFromUID(uid)?.name }}
                                </ModalsUserMiniCard>
                            </div>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Members</legend>
                            <div class="grid grid-cols-2 gap-2">
                                <ModalsUserMiniCard v-for="uid of team.members" mode="remove" :disabled="searchMode !== 'members'" @click="removeMember(uid)">
                                    {{ userFromUID(uid)?.name }}
                                </ModalsUserMiniCard>
                            </div>
                        </fieldset>
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