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

        <ToastContainer />
        <template #links>
            <HeaderLink to="/teams">Teams</HeaderLink>
            <div class="dropdown dropdown-hover">
                <div>
                    <HeaderLink to="/#programs">Programs</HeaderLink>
                    <div tabindex="0" class="dropdown-content p-0 gap-0">
                        <ClientOnly>
                            <div class="box bg-off-black flex flex-col gap-3 rounded-box z-60 w-max mt-1.5 p-2 shadow-sm">
                                <HeaderLink v-for="blog of programBlogs" :to="'/blog/' + blog.id">{{ blog.title }}</HeaderLink>
                            </div>
                        </ClientOnly>
                    </div>
                </div>
            </div>
            <HeaderLink to="/blog">Blog</HeaderLink>
            <HeaderLink to="/officers">Officers</HeaderLink>
            <HeaderLink to="/sponsor">Sponsor</HeaderLink>
            <HeaderLink to="/#contact">Contact</HeaderLink>
            <ClientOnly>
                <HeaderLink @click="handleLoginClick" class="invisible md:visible">{{ currentUser ? 'Account' : 'Login' }}</HeaderLink>
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