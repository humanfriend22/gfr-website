<script setup lang="ts">
const { seasonId, teamId } = useRoute().params;

const team = computed(() => {
    return seasons.value.find(
        (s) => s.id === seasonId
    )?.teams.find((t) => t.letter === teamId)! as Team;
});
const season = computed(() => {
    return seasons.value.find(season => season.id === seasonId)! as Season;
});

function formatCompetitionDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options);
}

const competitions = ref<Competition[]>([]);
onMounted(async () => {
    await updateSeason(seasonId as string);
    const seasonReId = season.value!.reId;
    competitions.value = (await fetchTeamCompetitions(seasonReId, team.value!.reId as number))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});
</script>

<template>
    <Section class="h-auto">
        <ClientOnly>
            <div class="flex flex-col gap-5 px-5 pt-5">
                <div class="flex flex-row justify-between">
                    <div class="flex flex-row gap-4">
                        <NuxtImg :src="team?.logo" class="w-48 h-48 rounded-md bg-black" />
                        <div class="h-fit">
                            <div class="font-bold text-7xl">{{ team?.name }}</div>
                            <h3 class="text-gray-500 text-2xl">{{team.captains.map((u: string) => userFromUID(u)?.name).join(' & ')}}</h3>
                        </div>
                    </div>
                    <div class="flex flex-col justify-start">
                        <div class="flex items-center gap-3.5">
                            <NuxtLink v-if="team?.discord !== ''" :to="team?.discord">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-discord w-9 hover:text-[#5864f1] duration-300 text-gray-300" viewBox="0 0 16 16">
                                    <path
                                        d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                                </svg>
                            </NuxtLink>
                            <NuxtLink class="relative w-9 h-9 cursor-pointer" v-if="team?.instagram !== ''" :to="'https://instagram.com/' + team?.instagram">
                                <NuxtImg src="/instagram.svg" class="w-9 absolute" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-instagram w-9 absolute hover:opacity-0 opacity-100 text-gray-300 duration-300"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                </svg>
                            </NuxtLink>
                            <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-github w-9 text-gray-300 hover:text-white duration-300 cursor-pointer" viewBox="0 0 16 16">
                            <path
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                        </svg> -->
                        </div>
                    </div>
                </div>
                <div class="w-full mx-1 h-0.5 bg-gray-500"></div>
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <h2 class="font-bold text-4xl mb-2">Competitions</h2>
                        <div class="flex flex-col gap-5">
                            <Transition v-for="competition of competitions" appear>
                                <div class="p-4 bg-zinc-900 rounded-lg flex flex-col gap-2" :style="`transition: opacity ${0.75 * (competitions.indexOf(competition) + 1)}s ease-in`">
                                    <div class="text-xl">{{ competition.name }}</div>
                                    <div class="text-gray-600">{{ competition.location }}</div>
                                    <div class="flex justify-between">
                                        <div class="text-gray-400">{{ formatCompetitionDate(competition.date) }}</div>
                                        <div>
                                            <div>
                                                <span class="badge m-1 float-end bg-[var(--gfr-red)]" v-for="award of competition.awards">{{ award }}</span>
                                            </div>
                                            <div>
                                                <span class="badge m-1 float-end bg-[var(--gfr-blue)]" v-if="competition.level === 'Signature'">Signature Event</span>
                                                <span class="badge m-1 float-end bg-[var(--gfr-blue)]" v-if="competition.level === 'Regional'">State Championship</span>
                                                <span class="badge m-1 float-end bg-yellow-500" v-if="competition.level === 'World'">World Championship</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Transition>
                        </div>
                    </div>
                    <div class="col-span-6">
                        <h2 class="font-bold text-4xl mb-2">Members</h2>
                        <ul class="list-disc ml-7">
                            <li v-for="uid in team?.members" class="text-lg text-gray-500">{{ userFromUID(uid)?.name }}</li>
                        </ul>
                        <!-- <div class="grid grid-cols-4 gap-5">
                        <div class="p-5 flex flex-col justify-center items-center gap-2 bg-zinc-900 rounded-lg" v-for="uid in team?.members">
                            <NuxtImg src="/pfp.png" class="rounded-full w-18" />
                            <h1 class="text-center">{{ userFromUID(uid)?.name }}</h1>
                            <span class="text-gray-400">Captain</span>
                        </div>
                    </div> -->
                    </div>
                </div>
            </div>
        </ClientOnly>
    </Section>
</template>

<style>
.v-enter-from {
    opacity: 0;
}

.v-enter-to {
    opacity: 1;
}
</style>