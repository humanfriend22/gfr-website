<script setup lang="ts">
import { ModalsUserMiniCard } from '#components';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { capitalize } from 'vue';

const { seasonId, creating } = defineProps<{
    creating: boolean;
    seasonId: string
}>();

const closeButton = useTemplateRef('close');
const saving = ref(false);
const errorMessage = computed(() => {
    if (Object.values(officers.value).includes('')) return 'All officer positions must be filled';
    return '';
});

const officers = ref<Season['officers']>(creating ? {
    president: '',
    vice_president: '',
    secretary: '',
    treasurer: '',
    junior_pred: '',
    senior_pred: ''
} : currentSeason.value.officers);

const currentOfficer = ref<keyof Season['officers']>('president');
const officerTitleMap = {
    president: 'President',
    vice_president: 'Vice President',
    secretary: 'Secretary',
    treasurer: 'Treasurer',
    junior_pred: 'Junior PRED',
    senior_pred: 'Senior PRED'
};

const searchTerm = ref('');
const searchResults = ref<User[]>([]);

watchEffect(() => {
    if (searchTerm.value.length < 2) {
        searchResults.value = [];
        return;
    }
    const results = users.value.filter(user => {
        return !Object.values(officers.value).includes(user.uid) && user.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    });
    searchResults.value = results.slice(0, 3);
});

function addOfficer(user: User) {
    officers.value[currentOfficer.value] = user.uid;
    // go to next officer
    const keys = Object.keys(officers.value) as (keyof Season['officers'])[];
    const i = keys.indexOf(currentOfficer.value);
    currentOfficer.value = i < keys.length - 1 ? keys[i + 1] : 'president';
    searchTerm.value = '';
};

function removeOfficer(uid: string) {
    for (const key in officers.value) {
        if (officers.value[key as keyof Season['officers']] === uid) {
            officers.value[key as keyof Season['officers']] = '';
            currentOfficer.value = key as keyof Season['officers'];
            break;
        }
    }
};

async function save() {
    if (errorMessage.value !== '') return;

    saving.value = true;

    const seasonDoc = doc(firestore.value!, 'seasons', seasonId);
    const siteDoc = doc(firestore.value!, 'site', 'site');

    // Only the officers could be changed so we can assume captains are the same.
    currentSeason.value.officers = officers.value;

    if (creating) {
        await setDoc(seasonDoc, {
            reId: latestSeason.value.reId,
            officers: officers.value,
        });
        await updateDoc(siteDoc, {
            currentSeason: seasonId,
            admins: resolveAdmins()
        });
        window.location.reload();
    } else {
        await updateDoc(seasonDoc, {
            officers: officers.value
        });
        await updateDoc(siteDoc, {
            currentSeason: seasonId,
            admins: resolveAdmins()
        });
    }

    saving.value = false;
    closeButton.value?.click();
}
</script>

<template>
    <dialog :id="creating ? 'create_season_modal' : 'edit_season_modal'" class="modal">
        <div class="modal-box w-11/12 max-w-[var(--container-4xl)] h-[var(--container-3xl)] flex flex-col">
            <h3 class="text-lg font-bold">{{ creating ? 'Create' : 'Edit' }} Season</h3>
            <div class="flex-1">
                <div>
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">ID</legend>
                        <input type="text" class="input" placeholder="Type here" :value="seasonId" disabled />
                    </fieldset>
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Officers</legend>
                        <div class="flex flex-row gap-4">
                            <div role="tablist" class="tabs tabs-box flex flex-col h-65 w-40">
                                <a v-for="key of Object.keys(officers)" role="tab" @click="currentOfficer = key as keyof Season['officers']"
                                    :class="'tab flex-1 ' + (key === currentOfficer ? 'tab-active' : '')">
                                    {{ officerTitleMap[key as keyof typeof officerTitleMap] }}
                                </a>
                            </div>
                            <div class="w-fit h-40">
                                <ModalsUserMiniCard class="mb-2" v-for="uid of Object.values(officers)" mode="remove" @click="removeOfficer(uid)">
                                    {{ uid === '' ? 'n/a' : userFromUID(uid)?.name }}
                                </ModalsUserMiniCard>
                            </div>
                            <div>
                                <label class="input mb-2">
                                    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <path d="m21 21-4.3-4.3"></path>
                                        </g>
                                    </svg>
                                    <input type="text" class="grow" placeholder="Search users..." v-model="searchTerm" />
                                </label>
                                <div class="h-36 relative">
                                    <ModalsUserMiniCard v-for="user of searchResults" @click="addOfficer(user)" mode="add" class="mb-2">
                                        {{ user.name }}
                                    </ModalsUserMiniCard>
                                    <p v-show="searchResults.length === 0" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-sm w-full text-gray-400 italic">
                                        Search users...
                                    </p>
                                </div>
                            </div>
                        </div>

                    </fieldset>
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
                    <button class="btn bg-[var(--gfr-blue)]" @click="save" :disabled="saving || errorMessage !== ''">
                        <span class="loading" v-if="saving"></span>
                        {{ saving ? 'Saving...' : 'Save' }}
                    </button>
                </div>
            </div>
        </div>
    </dialog>
</template>