<script setup lang="ts">
definePageMeta({
    layout: 'admin'
});

const editingUser = ref<User>({
    uid: '',
    name: '',
    email: '',
    graduatingYear: 2027,
    bio: '',
    pfp: ''
});

function showEditUserModal(user: User) {
    editingUser.value = user;
    const modal = document.getElementById('edit_user_modal') as HTMLDialogElement;
    modal.showModal();
};

const usersSortMode = ref<'all' | 'member' | 'admin'>('all');
const sortedUsers = computed(() => {
    if (usersSortMode.value === 'all') return users.value;
    if (usersSortMode.value === 'admin') return users.value.filter(user => site.value.admins.includes(user.uid));
});

onMounted(async () => {
    await Promise.all([
        updateUsers(true),
        updateSeasons(true)
    ]);
});
</script>

<template>
    <Section class="flex flex-col px-5">
        <dialog id="edit_user_modal" class="modal">
            <ClientOnly>
                <LazyModalsEditUserContent :for-owner="false" :user="editingUser">Manage Account</LazyModalsEditUserContent>
            </ClientOnly>
        </dialog>

        <h1 class="text-2xl font-bold">Users</h1>
        <div role="tablist" class="tabs tabs-sm tabs-box flex flex-row mt-7 mb-4 w-1/2" v-if="isCurrentPresident">
            <a role="tab" @click="usersSortMode = 'all'" :class="'tab flex-1 ' + (usersSortMode === 'all' ? 'tab-active' : '')">All</a>
            <!-- <a role="tab" @click="usersSortMode = 'member'" :class="'tab flex-1 ' + (usersSortMode === 'member' ? 'tab-active' : '')">Members</a> -->
            <a role="tab" @click="usersSortMode = 'admin'" :class="'tab flex-1 ' + (usersSortMode === 'admin' ? 'tab-active' : '')">Admin</a>
        </div>

        <div class="w-fit h-[70vh] min-h-24 overflow-y-auto overflow-x-none rounded-box border border-base-content/5">
            <table class="table table-md table-pin-rows w-[40rem] max-h-[70vh]">
                <!-- head -->
                <thead class="bg-[var(--primary-background-color)]">
                    <tr>
                        <th class="bg-neutral-950">Name</th>
                        <th class="bg-neutral-950">UID</th>
                        <th class="bg-neutral-950">Email</th>
                        <th class="bg-neutral-950">Roles</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user of sortedUsers">
                        <td class="underline hover:text-gfr-blue duration-300 cursor-pointer" @click="showEditUserModal(user)">{{ user.name }}</td>
                        <td>{{ user.uid }}</td>
                        <td>{{ user.email }}</td>
                        <td class="flex flex-row">
                            <span class="badge bg-gfr-red mr-1" v-if="site.admins.includes(user.uid)">Admin</span>
                            <span class="badge bg-gfr-blue mr-1" v-if="currentCaptains.includes(user.uid)">Captain</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Section>
</template>

<style scoped>
select:focus {
    outline: 2px !important;
}
</style>