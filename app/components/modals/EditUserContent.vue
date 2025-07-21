<script setup lang="ts">
import { updateProfile } from 'firebase/auth';
import { collection, doc, FieldValue, updateDoc } from 'firebase/firestore';

const { user } = defineProps<{
    user: User;
    forOwner: boolean;
}>();

const insideModal = ref(false);

const userIsACaptain = computed(() => {
    return currentSeason.value?.teams.find(team => team.captains.includes(user.uid));
});

const saving = ref(false);
const errorMessage = computed(() => {
    if (!user) return 'User not found';
    if (user.name.length < 2 || user.name.length > 30) return 'Invalid name (2-30 characters)';
    if (!user.name.includes(' ')) return 'Invalid name (must include first and last name)';
    const min = (new Date()).getFullYear();
    if (user.graduatingYear < min || user.graduatingYear > min + 5) return `Invalid graduating year (${min}-${min + 5})`;
    return '';
});

const willRevokeCaptain = ref(false);
async function revokeCaptain() {
    if (!userIsACaptain.value) return;
    willRevokeCaptain.value = true;
};

async function save() {
    saving.value = true;
    console.log(user.uid)
    const userRef = doc(firestore.value!, 'users', user.uid);
    let promises = [
        updateDoc(userRef, {
            name: user.name,
            team: user.team,
            graduatingYear: user.graduatingYear,
            isAdmin: willRevokeCaptain.value ? false : (user.isAdmin || false),
        })
    ];
    if (user.team !== currentUser.value?.displayName) {
        promises.push(
            updateProfile(currentUser.value!, {
                displayName: user.name
            })
        );
    }
    if (willRevokeCaptain.value) {
        console.warn('Revoking captaincy for ', user.name);
        const seasonRef = doc(firestore.value!, 'seasons', currentSeason.value.id);
        promises.push(
            updateDoc(doc(collection(seasonRef, 'teams'), userIsACaptain.value?.letter), {
                captains: currentSeason.value.teams.find(team => team.letter === userIsACaptain.value?.letter)?.captains.filter(captain => captain !== user.uid) || []
            })
        );
    }
    await Promise.all(promises);
    saving.value = false;
    document.querySelector<HTMLButtonElement>('dialog #close')?.click();
};

async function handleLogout() {
    await logout();
    if (currentUserData.value?.isAdmin) {
        navigateTo('/');
    } else document.querySelector<HTMLButtonElement>('dialog #close')?.click();
};

onMounted(() => {
    insideModal.value = !!document.querySelector('#edit_user_modal');
})
</script>

<template>
    <div :class="insideModal ? 'modal-box' : 'w-100 border-2 p-4 rounded-box border-base-200/90'">
        <h3 class="text-lg font-bold">
            <slot />
        </h3>
        <p class="text-sm text-gray-500 mt-2">UID: {{ user.uid }}</p>
        <div class="ml-1">
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Name</legend>
                <input type="text" class="input" placeholder="e.g. John Doe" v-model="user.name" />
                <p class="label">Users and their captains can edit this.</p>
            </fieldset>
            <button class="btn btn-error" v-if="user.uid === currentUser?.uid && user.team !== '' && captainOfTeam === ''" @click="user.team = ''">Leave {{ user.team }} Team</button>
            <button class="btn btn-error" v-else-if="!forOwner && user.team && captainOfTeam === user.team" @click="user.team = ''">Remove from {{ user.team }} Team</button>
            <button class="btn btn-info" v-else-if="user.team === '' && !!captainOfTeam" @click="user.team = captainOfTeam">Add to {{ captainOfTeam }} Team</button>
            <fieldset class="fieldset" v-else-if="isCurrentPresident">
                <legend class="fieldset-legend">Team</legend>
                <select class="select" v-model="user.team">
                    <option value="">No Team</option>
                    <option v-for="team of currentSeason?.teams" :value="team.letter">({{ team.letter }}) {{ team.name }}</option>
                </select>
                <p class="label">Captains can edit those not already on a team.</p>
            </fieldset>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Graduating Year</legend>
                <input type="number" class="input" placeholder="e.g. 2027" v-model="user.graduatingYear" />
                <p class="label">Users and their captains can edit this.</p>
            </fieldset>
            <div>
                <button class="btn btn-error" v-if="!!userIsACaptain && !forOwner" @click="revokeCaptain">REVOKE CAPTAIN</button>
            </div>
        </div>

        <div class="modal-action flex flex-row justify-between">
            <div class="flex flex-col w-full gap-4">
                <span class="text-sm pl-2 text-red-500 w-64" v-if="forOwner && insideModal && errorMessage !== ''">{{ errorMessage }}</span>

                <div class="flex flex-row justify-between gap-2 w-full">
                    <div>
                        <button class="btn bg-[var(--gfr-red)]" @click="handleLogout" v-if="forOwner && insideModal">Logout</button>
                        <span class="text-sm text-start text-red-500" v-else-if="errorMessage !== ''">{{ errorMessage }}</span>
                    </div>
                    <div class="flex flex-row justify-between gap-2">
                        <form method="dialog">
                            <button class="btn" id="close" v-if="insideModal">Cancel</button>
                            <button class="btn bg-[var(--gfr-red)]" v-else @click="handleLogout">Logout</button>
                        </form>
                        <button class="btn bg-[var(--gfr-blue)]" @click="save" :disabled="saving || errorMessage !== ''">
                            <span class="loading" v-if="saving"></span>
                            {{ saving ? 'Saving...' : 'Save' }}
                        </button>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>