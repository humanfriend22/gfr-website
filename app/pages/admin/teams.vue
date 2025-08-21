<script setup lang="ts">
definePageMeta({
    layout: 'admin'
});

const creatingSeason = ref(false);
const editingSeason = ref<Season>({
    id: '',
    reId: 0,
    officers: {
        president: '',
        vice_president: '',
        secretary: '',
        treasurer: '',
        junior_pred: '',
        senior_pred: ''
    },
    teams: []
});

const creatingTeam = ref(false);
const allowedLetters = ref(['']);
const currentEditingTeam = ref<Team>({
    letter: '',
    name: '',
    reId: 0,
    logo: '',
    captains: [],
    members: [],
    competitions: {},
    discord: '',
    instagram: ''
});

const editingSeasonId = ref('');
function showEditTeamModal(season: Season, team: Team) {
    if (!isCurrentPresident.value && (captainOfTeam.value !== team.letter)) return;

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
        letter: allowedLetters.value[0]!,
        name: '',
        reId: 0,
        logo: '',
        captains: [],
        members: [],
        competitions: {},
        discord: '',
        instagram: ''
    };
    editingSeasonId.value = currentSeason.value?.id || '';

    creatingTeam.value = true;
    const modal = document.getElementById('edit_team_modal') as HTMLDialogElement;
    modal.showModal();
};

function showSeasonModal(mode: 'create' | 'edit') {
    if (!isCurrentPresident.value) return;

    if (mode === 'edit') {
        editingSeason.value.id = currentSeason.value?.id || '';
        editingSeason.value.reId = currentSeason.value?.reId || 0;
        editingSeason.value.officers = { ...currentSeason.value?.officers };
    } else {
        editingSeason.value = {
            id: latestSeason.value.id,
            reId: latestSeason.value.reId,
            officers: {
                president: '',
                vice_president: '',
                secretary: '',
                treasurer: '',
                junior_pred: '',
                senior_pred: ''
            },
            teams: []
        };
    };

    creatingTeam.value = false;
    creatingSeason.value = mode === 'create';
    const modal = document.getElementById('edit_season_modal') as HTMLDialogElement;
    modal.showModal();
};

const viewableSeasons = computed(() => seasons.value
    .filter(season => (season.id === currentSeason.value?.id || isCurrentPresident.value))
    .sort((a, b) => {
        const aPart = a.id.split('-')[2] ?? '';
        const bPart = b.id.split('-')[2] ?? '';
        return bPart.localeCompare(aPart);
    }));

onMounted(async () => {
    await Promise.all([
        updateUsers(),
        updateSeasons()
    ]);
    await nextTick();
    if (isCurrentPresident.value) {
        await updateLatestSeason();
    }
});
</script>

<template>
    <Section class="px-5 flex flex-col gap-3">
        <ClientOnly>
            <ModalsEditSeason :season="editingSeason" :creating="creatingSeason" v-if="isCurrentPresident" />
            <ModalsEditTeam :team="currentEditingTeam" :seasonId="editingSeasonId" :creating="creatingTeam" :allowed-letters="allowedLetters" />

            <div class="flex flex-row gap-2">
                <button class="btn w-fit" @click="showSeasonModal('edit')" v-if="isCurrentPresident">
                    Edit Season
                </button>
                <button class="btn w-fit" @click="showSeasonModal('create')" v-if="isCurrentPresident && latestSeason.id !== '' && currentSeason.id !== latestSeason.id">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Create Season
                </button>
            </div>

            <div class="p-5 rounded-box border border-base-content/7" v-for="season of viewableSeasons">
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
                    <TeamCard v-for="team of season.teams" :team="team" @click="showEditTeamModal(season, team)" />

                </div>
            </div>
        </ClientOnly>
    </Section>
</template>