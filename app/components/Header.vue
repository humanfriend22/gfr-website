<script setup lang="ts">
import { updateProfile } from 'firebase/auth';

const { isAdmin } = defineProps({
    isAdmin: {
        type: Boolean,
        default: false
    }
});

function handleLoginClick() {
    loginWithRedirect();
}

const name = ref('');
const imageSrc = ref('');

watch(currentUser, () => {
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
</script>

<template>
    <div class="flex items-center lg:justify-center h-24 w-full max-w-screen-xl mx-auto sticky top-0 left-0 z-30 text-primary bg-gradient-to-b from-black/80 to-black/1 px-3">
        <NuxtLink to="/" class="flex items-center gap-5 text-lg font-extrabold tracking-wide sm:text-lg">
            <NuxtImg src="gfr.png" width="50" height="50" class="inline" />
            <h1 class="gfr-gradient bg-clip-text text-transparent bg-gradient-to-r">
                <slot />
            </h1>
        </NuxtLink>

        <!-- Open the modal using ID.showModal() method -->
        <dialog id="edit_profile_modal" class="modal">
            <div class="modal-box">
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
                <div class="modal-action">
                    <button class="btn" id="close" :disabled="saving" onclick="edit_profile_modal.close()">Close</button>
                    <button class="btn bg-[var(--gfr-blue)]" :disabled="saving" @click="handleSave">
                        <div class="loading w-4" v-if="saving"></div>
                        Save
                    </button>
                </div>
            </div>
        </dialog>

        <!-- Desktop -->
        <div id="links" class="ml-auto items-center justify-end hidden lg:flex">
            <NuxtLink to="/about">
                <HeaderLink>About</HeaderLink>
            </NuxtLink>
            <NuxtLink to="/teams">
                <HeaderLink>Teams</HeaderLink>
            </NuxtLink>
            <NuxtLink to="/events">
                <HeaderLink>Events</HeaderLink>
            </NuxtLink>
            <NuxtLink to="/blog">
                <HeaderLink>Blog</HeaderLink>
            </NuxtLink>
            <NuxtLink to="/contact">
                <HeaderLink>Contact</HeaderLink>
            </NuxtLink>
            <div>
                <ClientOnly>
                    <HeaderLink v-if="!currentUser" @click="handleLoginClick">Login</HeaderLink>
                    <div class="dropdown dropdown-end ml-2" v-else>
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                            <div class="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" :src="currentUser!.photoURL!" />
                            </div>
                        </div>
                        <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a class="font-semibold" onclick="edit_profile_modal.showModal()">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    Profile
                                </a>
                            </li>
                            <li>
                                <NuxtLink class="font-semibold" to="/admin">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                    Admin
                                </NuxtLink>
                            </li>
                            <li>
                                <a @click="logout" class="text-[var(--gfr-red)] font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 ml-0.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
                                    </svg>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </ClientOnly>
            </div>

        </div>
        <!-- Mobile -->
        <label id="drawer-button" for="my-drawer-3" aria-label="open sidebar" class="btn btn-square ml-auto lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-6 w-6 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </label>
    </div>
</template>