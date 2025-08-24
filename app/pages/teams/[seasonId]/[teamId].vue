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
                        <NuxtImg :src="team?.logo" class="w-20 h-20 md:w-48 md:h-48 rounded-md bg-black" />
                        <div class="h-fit">
                            <div class="font-bold text-3xl md:text-7xl">{{ team?.name }}</div>
                            <h3 class="text-gray-500 text-xl">{{team.captains.map((u: string) => userFromUID(u)?.name).join(' & ')}}</h3>
                        </div>
                    </div>
                    <Socials :width="8" :instagram="team.instagram" :discord="team.discord" />
                </div>
                <div class="w-full mx-1 h-0.5 bg-gray-500"></div>
                <div class="flex flex-col-reverse md:grid md:grid-cols-2 gap-4">
                    <div>
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
                                                <span class="badge m-1 float-end bg-gfr-red" v-for="award of competition.awards">{{ award }}</span>
                                            </div>
                                            <div>
                                                <span class="badge m-1 float-end bg-gfr-blue" v-if="competition.level === 'Signature'">Signature Event</span>
                                                <span class="badge m-1 float-end bg-gfr-blue" v-if="competition.level === 'Regional'">State Championship</span>
                                                <span class="badge m-1 float-end bg-yellow-500" v-if="competition.level === 'World'">World Championship</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Transition>
                        </div>
                    </div>
                    <div>
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