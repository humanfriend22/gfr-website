<script setup lang="ts">
import { updateProfile } from 'firebase/auth';
import { collection, doc, FieldValue, updateDoc } from 'firebase/firestore';
import OfficerCard from '../OfficerCard.vue';
import ImageDisplay from '../ImageDisplay.vue';

const { user, forOwner } = defineProps<{
    user: User;
    forOwner: boolean;
}>();

const insideModal = ref(false);
const pfpImage = useTemplateRef('pfp');
const pfpPreviewSrc = ref('');
function updatePfpPreview() {
    pfpPreviewSrc.value = readObjectURLFromImage(pfpImage);
};

const userIsACaptain = computed(() => {
    return currentSeason.value?.teams.find(team => team.captains.includes(user.uid));
});

const isForOfficer = computed(() => {
    if (!(forOwner || isCurrentPresident)) return false;
    for (const [key, value] of Object.entries(currentSeason.value.officers)) {
        if (value === user.uid) return key;
    }
    return false;
});

const saving = ref(false);
const errorMessage = computed(() => {
    if (!user) return 'User not found';
    if (!user.name) return 'Please try again, your account is being created...';
    if (user.name.length < 2 || user.name.length > 30) return 'Invalid name (2-30 characters)';
    if (!user.name.includes(' ')) return 'Invalid name (must include first and last name)';
    const min = (new Date()).getFullYear();
    if (user.graduatingYear < min || user.graduatingYear > min + 5) return `Invalid graduating year (${min}-${min + 5})`;
    if (user.bio?.length > 200) return 'Invalid bio (max 300 characters)';
    return '';
});

const shouldRevokeAdminAccess = ref(false);

async function save() {
    saving.value = true;

    if (!currentUser.value) return;

    let pfpUrl = currentUserData.value?.pfp || '';
    if (readObjectURLFromImage(pfpImage) !== '') {
        pfpUrl = await uploadImage(pfpImage, `users/${user.uid}`);
    }

    const userDoc = doc(firestore.value!, 'users', user.uid);
    let promises = [
        // The user's data
        updateDoc(userDoc, {
            name: user.name,
            graduatingYear: user.graduatingYear,
            bio: user.bio,
            pfp: pfpUrl,
        }),
        updateProfile(currentUser.value!, {
            displayName: user.name
        })
    ];
    if (shouldRevokeAdminAccess.value && isCurrentPresident.value) {
        const siteDoc = doc(firestore.value!, 'site', 'site');

        // Remove global access (this MUST remove complete edit access from the database and bucket)
        promises.push(
            updateDoc(siteDoc, {
                admins: site.value.admins.filter(uid => uid !== user.uid)
            })
        );
        // Remove from captain list
        if (userIsACaptain.value) {
            const seasonDoc = doc(firestore.value!, 'seasons', currentSeason.value.id);
            const teamDoc = doc(collection(seasonDoc, 'teams'), userIsACaptain.value?.letter);
            promises.push(
                updateDoc(teamDoc, {
                    captains: currentSeason.value.teams.find(team => team.letter === userIsACaptain.value?.letter)?.captains.map(uid => uid !== user.uid)
                })
            );
        }
    }
    await Promise.all(promises);
    saving.value = false;
    document.querySelector<HTMLButtonElement>('dialog #close')?.click();
};

async function handleLogout() {
    await logout();
    if (isAdmin.value) {
        navigateTo('/');
    } else document.querySelector<HTMLButtonElement>('dialog #close')?.click();
};

onMounted(() => {
    insideModal.value = !!document.querySelector('#edit_user_modal');
});
</script>

<template>
    <div :class="insideModal ? 'modal-box ' + (isForOfficer ? 'w-11/12 max-w-[var(--container-3xl)]' : '') : ('box ' + (isForOfficer ? 'w-180' : 'w-90'))">
        <h3 class="text-lg font-bold">
            <slot />
        </h3>
        <p class="text-sm text-gray-500 mt-2">UID: {{ user.uid }}</p>
        <p class="text-sm text-gray-500 mt-2">Email: {{ user.email }}</p>
        <div :class="'ml-1 grid gap-2 ' + (isForOfficer ? 'grid-cols-2' : 'grid-cols-1')">
            <div>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Name</legend>
                    <div class="flex flex-row gap-2">
                        <input type="text" class="input" placeholder="e.g. John Doe" v-model="user.name" />
                    </div>
                    <p class="label">Users and their captains can edit this.</p>
                </fieldset>
                <div v-if="isForOfficer">
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Officer Bio</legend>
                        <textarea class="textarea h-35" placeholder="Shown on blog preview" v-model="user.bio" />
                        <div class="label">This will be shown on the officers page.</div>
                    </fieldset>
                </div>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Graduating Year</legend>
                    <input type="number" class="input" placeholder="e.g. 2027" v-model="user.graduatingYear" />
                    <p class="label">Users and their captains can edit this.</p>
                </fieldset>
                <div>
                    <button class="btn btn-error" v-if="!!userIsACaptain && !forOwner" @click="shouldRevokeAdminAccess = true">REVOKE ADMIN ACCESS</button>
                </div>
            </div>
            <div v-if="isForOfficer" class="flex flex-col">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Profile Picture</legend>
                    <input type="file" accept=".png,.jpg,.jpeg,.webp" class="file-input w-full" ref="pfp" @change="updatePfpPreview" />
                    <p class="label">Preview will update below.</p>
                </fieldset>
                <ImageDisplay :src="pfpPreviewSrc" class="w-2/3 mt-1 max-w-[200px] mask mask-circle" />
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