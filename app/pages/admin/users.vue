<script setup lang="ts">
definePageMeta({
    layout: 'admin'
});

const editingUser = ref<User>({
    uid: '',
    name: '',
    email: '',
    team: '',
    graduatingYear: 2027,
    isAdmin: false
});

function showEditUserModal(user: User) {
    editingUser.value = user;
    const modal = document.getElementById('edit_user_modal') as HTMLDialogElement;
    modal.showModal();
};

onMounted(async () => {
    await Promise.all([
        updateUsers(),
        updateSeasons()
    ]);
});
</script>

<template>
    <Section class="flex flex-col gap-4 px-5">
        <dialog id="edit_user_modal" class="modal">
            <ClientOnly>
                <LazyModalsEditUserContent :for-owner="true" :user="editingUser">Manage Account</LazyModalsEditUserContent>
            </ClientOnly>
        </dialog>

        <h1 class="text-2xl font-bold">Users</h1>

        <div class="w-fit h-[70vh] min-h-24 overflow-y-auto overflow-x-none rounded-box border border-base-content/5">
            <table class="table table-md table-pin-rows w-[40rem] h-[70vh]">
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
                    <tr v-for="user of users">
                        <td class="underline hover:text-[var(--gfr-blue)] duration-300 cursor-pointer" @click="showEditUserModal(user)">{{ user.name }}</td>
                        <td>{{ user.uid }}</td>
                        <td>{{ user.email }}</td>
                        <td class="flex flex-row">
                            <span class="badge bg-[var(--gfr-red)] mr-1" v-if="user.isAdmin">Admin</span>
                            <span class="badge bg-[var(--gfr-red)] mr-1" v-if="currentSeason.teams.find(team => team.letter === user.team)?.captains.includes(user.uid)">Captain</span>
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