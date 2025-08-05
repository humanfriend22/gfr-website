<script setup lang="ts">
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
    <PageContainer>
        <template #links>
            <HeaderLink to="/about">About</HeaderLink>
            <HeaderLink to="/teams">Teams</HeaderLink>
            <HeaderLink to="/officers">Officers</HeaderLink>
            <HeaderLink to="/events">Events</HeaderLink>
            <HeaderLink to="/blog">Blog</HeaderLink>
            <HeaderLink to="/sponsor">Sponsor</HeaderLink>
            <ClientOnly>
                <HeaderLink @click="handleLoginClick">{{ currentUser ? 'Account' : 'Login' }}</HeaderLink>
            </ClientOnly>
        </template>
        <dialog id="edit_user_modal" class="modal">
            <ClientOnly>
                <ModalsEditUserContent :for-owner="true" v-if="!!currentUserData" :user="currentUserData">Manage Account</ModalsEditUserContent>
            </ClientOnly>
        </dialog>
        <slot />
    </PageContainer>
</template>