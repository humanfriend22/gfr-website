<script setup lang="ts">
import { updateProfile } from 'firebase/auth';

function handleLoginClick() {
    if (currentUser.value) {
        if (site.value.admins.includes(currentUser.value.uid)) {
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
                <ModalsEditUserContent :for-owner="true" v-if="!!currentUserData" :user="currentUserData">Manage Account</ModalsEditUserContent>
            </ClientOnly>
        </dialog>

        <div class="min-h-screen">
            <Header>
                <HeaderLink to="/about">About</HeaderLink>
                <HeaderLink to="/teams">Teams</HeaderLink>
                <HeaderLink to="/officers">Officers</HeaderLink>
                <HeaderLink to="/events">Events</HeaderLink>
                <HeaderLink to="/blog">Blog</HeaderLink>
                <div>
                    <ClientOnly>
                        <HeaderLink @click="handleLoginClick">{{ currentUser ? 'Account' : 'Login' }}</HeaderLink>
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