<script setup lang="ts">
import { doc, updateDoc } from 'firebase/firestore';

definePageMeta({
    layout: 'admin'
});

// const nuxtApp = useNuxtApp();

// // Team Form
// const teamName = ref('');
// const teamLogo = useTemplateRef('team-logo');
// const teamLogoPreview = ref('');
// const captainSearchTerm = ref('');
// const captainsSearchResults = computed((): string[] => {
//     return users.value
//         .map(user => user.name)
//         .filter(name => (name.toLowerCase().includes(captainSearchTerm.value.toLowerCase()) && !captains.value.includes(name) && name !== ''))
//         .slice(0, 3);
// });
// const captainSearchLabel = computed((): string => {
//     if (captainsSearchResults.value.length === 0) return "Can't find that member...";
//     else if (captainsSearchResults.value.length > 0 && captainSearchTerm.value !== '') return "Add your captain!";
//     else if (captains.value.length === 2) return "Woah no more!";
//     return 'Start typing...';;
// });
// const captains = ref<string[]>([]);

// function addCaptain(name: string) {
//     if (captains.value.length < 2 && !captains.value.includes(name)) {
//         captains.value.push(name);
//         captainSearchTerm.value = '';
//     };
// };

// function removeCaptain(name: string) {
//     captains.value = captains.value.filter((captain) => captain !== name);
//     captainSearchTerm.value = '';
// };

// function updateTeamLogo() {
//     const files = teamLogo.value?.files;
//     if (files) {
//         teamLogoPreview.value = URL.createObjectURL(files[0]);
//     }
// };

const currentEditingTeam = ref<Team>({
    letter: '',
    name: '',
    logo: '',
    reId: '',
    captains: [],
    members: [],
    competitions: {}
});

const editingSeasonId = ref('');
function showEditTeamModal(seasonId: string, team: Team) {
    currentEditingTeam.value = { ...team };
    editingSeasonId.value = seasonId;

    const editTeamModal = document.getElementById('edit_team_modal') as HTMLDialogElement;
    editTeamModal.showModal();
};



onMounted(async () => {
    await Promise.all([
        updateUsers(),
        updateSeasons()
    ]);
    console.log(users.value, seasons.value)
})
</script>

<template>
    <Section class="px-5 flex flex-col gap-2">
        <div v-if="false">
            <button class="btn mr-2" onclick="create_team_modal.showModal()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                New Team
            </button>
        </div>

        <ModalsEditTeam :team="currentEditingTeam" :seasonId="editingSeasonId" />

        <h1 class="text-2xl font-bold">Teams</h1>
        <p class="text-gray-400">Edit your competition team(s).</p>

        <div class="p-5 rounded-box border border-base-content/7" v-for="season of seasons">
            <h2 class="text-xl font-semibold text-gray-100 mb-3">Push Back 25-26</h2>

            <div class="grid grid-cols-2 gap-4">
                <div v-for="team of season.teams" class="flex gap-3 p-4 bg-base-200 hover:bg-base-300 cursor-pointer duration-300 rounded-lg" @click="showEditTeamModal(season.id, team)">
                    <div>
                        <TeamLogoDisplay src="RLogo.png" :width="100" :height="100" />
                        <!-- <NuxtImg src="RLogo.png" width="100" height="100" class="rounded-md select-none" /> -->
                    </div>
                    <div class="w-full text-gray-300">
                        <div class="flex items-center justify-between text-white">
                            <h1 class="font-bold text-lg">{{ team.name }}</h1>
                            <button class="btn btn-ghost btn-square hover:text-gray-400 invisible">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <h1 class="font-semibold">
                                <span>{{team.captains.map(uid => userFromUID(uid)?.name).join(' & ')}}</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Section>
</template>

<style scoped></style>