<script setup lang="ts">
definePageMeta({
    layout: 'admin'
});

const creatingTeam = ref(false);
const allowedLetters = ref(['']);
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
function showEditTeamModal(season: Season, team: Team) {
    if (!(season.officers.president === currentUser.value?.uid) && !(team.captains.includes(currentUser.value?.uid || ''))) return;

    currentEditingTeam.value = { ...team };
    editingSeasonId.value = season.id;

    creatingTeam.value = false;
    const modal = document.getElementById('edit_team_modal') as HTMLDialogElement;
    modal.showModal();
};

function showCreateTeamModal() {
    if (!isCurrentPresident.value) return;

    allowedLetters.value = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(letter => !currentSeason.value?.teams.some(team => team.letter === letter));
    currentEditingTeam.value = {
        letter: allowedLetters.value[0],
        name: '',
        logo: '',
        reId: '',
        captains: [],
        members: [],
        competitions: {}
    };
    editingSeasonId.value = currentSeason.value?.id || '';

    creatingTeam.value = true;
    const modal = document.getElementById('edit_team_modal') as HTMLDialogElement;
    modal.showModal();
};

function showCreateSeasonModal() {
    if (!isCurrentPresident.value) return;

    creatingTeam.value = false;
    const modal = document.getElementById('create_season_modal') as HTMLDialogElement;
    modal.showModal();
};

const viewableSeasons = computed(() => seasons.value.filter(season => (season.id === currentSeason.value?.id || isCurrentPresident.value)));

const latestSeasonId = ref('');
onMounted(async () => {
    await Promise.all([
        updateUsers(),
        updateSeasons()
    ]);
    await nextTick();
    if (isCurrentPresident.value) {
        const id = await fetchLatestSeasonId();
        latestSeasonId.value = id;
    }
});
</script>

<template>
    <Section class="px-5 flex flex-col gap-3">
        <ModalsCreateSeason :season-id="latestSeasonId" v-if="isCurrentPresident && currentSeason.id !== latestSeasonId" />
        <ModalsEditTeam :team="currentEditingTeam" :seasonId="editingSeasonId" :creating="creatingTeam" :allowed-letters="allowedLetters" />

        <!-- <h1 class="text-2xl font-bold">Teams</h1>
        <p class="text-gray-400">Edit your competition team(s).</p> -->

        <button class="btn w-fit" @click="showCreateSeasonModal" v-if="isCurrentPresident && currentSeason.id !== latestSeasonId">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Season
        </button>

        <div class="p-5 rounded-box border border-base-content/7" v-for="season of viewableSeasons.sort((a, b) => b.id.split('-')[2].localeCompare(a.id.split('-')[2]))">
            <div class="flex flex-row justify-between mb-5 ml-1">
                <h2 class="text-xl font-semibold text-gray-100 my-auto">{{ formatSeasonId(season.id) }}</h2>
                <button class="btn" @click="showCreateTeamModal" v-if="isCurrentPresident">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Create Team
                </button>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div v-for="team of season.teams" class="flex gap-3 p-4 bg-base-200 hover:bg-base-300 cursor-pointer duration-300 rounded-lg" @click="showEditTeamModal(season, team)">
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