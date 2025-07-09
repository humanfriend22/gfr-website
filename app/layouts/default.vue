<script setup lang="ts">
import { updateProfile } from 'firebase/auth';

function handleLoginClick() {
    if (currentUser.value) {
        if (currentUserData.value?.isAdmin) {
            navigateTo('/admin');
        } else {
            const modal = document.getElementById('edit_user_modal') as HTMLDialogElement;
            modal.showModal();
        }
    } else login();
};
</script>

<template>
    <HeaderWrapper>
        <dialog id="edit_user_modal" class="modal">
            <ClientOnly>
                <LazyModalsEditUserContent :for-owner="true" v-if="currentUserData" :user="currentUserData">Manage Account</LazyModalsEditUserContent>
            </ClientOnly>
        </dialog>

        <div class="min-h-screen">
            <Header>
                <HeaderLink to="/about">About</HeaderLink>
                <HeaderLink to="/teams">Teams</HeaderLink>
                <HeaderLink to="/events">Events</HeaderLink>
                <HeaderLink to="/blog">Blog</HeaderLink>
                <HeaderLink to="/contact">Contact</HeaderLink>
                <div>
                    <ClientOnly>
                        <HeaderLink @click="handleLoginClick">{{ currentUser ? 'Account' : 'Login' }}</HeaderLink>
                        <!-- <div class="dropdown dropdown-end ml-2" v-else>
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
                        </div> -->
                    </ClientOnly>
                </div>
            </Header>
            <!-- Content -->
            <div class="bg-[var(--primary-background-color)] w-full mx-auto min-h-screen overflow-y-scroll overflow-x-hidden sm:px-0 -mt-24 text-white">
                <slot />
            </div>
            <Footer />
        </div>
    </HeaderWrapper>
</template>