<script setup lang="ts">
import { updateProfile } from 'firebase/auth';

const name = ref(currentUser.value?.displayName || '');

watch(currentUser, () => {
    console.log(currentUser.value?.displayName)
    if (name.value.length === 0 && currentUser.value?.displayName) {
        name.value = currentUser.value?.displayName;
    };
});

const saving = ref(false);
async function handleSave() {
    if (currentUser.value && name.value.length > 5 && name.value.length < 30 && name.value !== currentUser.value.displayName) {
        saving.value = true;
        try {
            await updateProfile(currentUser.value, {
                displayName: name.value
            });
        } catch (error) {
            window.alert('Error updating profile: ' + error);
        }
        saving.value = false;
        await nextTick();
        document.querySelector<HTMLButtonElement>('#edit_profile_modal #close')!.click();
    };
};
async function handleLogout() {
    await logout();
    if (isAdmin.value) {
        navigateTo('/');
    } else document.querySelector<HTMLButtonElement>('#edit_profile_modal #close')!.click();
};
</script>

<template>
    <div :class="isAdmin ? '' : 'modal-box'">
        <h3 class="text-lg font-bold">Account Settings</h3>
        <div>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Name</legend>
                <input type="text" class="input" placeholder="John Doe" v-model="name" />
                <p class="label">This will be shown on team rosters.</p>
            </fieldset>
            <div class="flex flex-row gap-4 h-24">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Profile</legend>
                    <input type="file" class="file-input" />
                </fieldset>
                <img src="https://placehold.co/40x40" class="w-24 h-24 rounded-md" />
            </div>
        </div>
        <div class="mt-6 flex flex-row justify-between">
            <div>
                <button class="btn bg-[var(--gfr-red)]" @click="handleLogout">Logout</button>
            </div>
            <div>
                <button class="btn mr-2" id="close" :disabled="saving" onclick="edit_profile_modal.close()" v-if="!isAdmin">Close</button>
                <button class="btn bg-[var(--gfr-blue)]" :disabled="saving" @click="handleSave">
                    <div class="loading w-4" v-if="saving"></div>
                    Save
                </button>
            </div>

        </div>
    </div>
</template>