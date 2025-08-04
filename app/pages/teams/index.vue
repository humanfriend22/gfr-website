<script setup lang="ts">
const seasonId = ref('');
const season = computed(() => {
    return seasons.value.find(s => s.id === seasonId.value) || currentSeason.value;
}); 
</script>

<template>
    <Section>
        <div class="h-full md:justify-center items-center flex flex-col px-5">
            <div class="flex flex-col justify-center items-center gap-7 w-full h-full md:w-5/6 md:mx-0 mt-10">
                <div class="justify-start font-bold md:text-5xl text-2xl">
                    Meet Our <span class="gfr-gradient">Competition</span> Teams
                </div>
                <Divider />
                <ClientOnly>
                    <div class="grid grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-2 max-h-[60vh]" v-if="season">
                        <NuxtLink v-for="team of season.teams" :to="'/teams/' + (season.id) + '/' + team.letter">
                            <TeamCard :team="team" />
                        </NuxtLink>
                    </div>
                    <div class="flex flex-row justify-between w-full">
                        <div></div>
                        <select class="select w-48 text-gray-400" v-model="seasonId">
                            <option disabled selected value="">View Past Seasons</option>
                            <option v-for="season of seasons" :value="season.id">{{ season.id }}</option>
                        </select>
                    </div>
                </ClientOnly>
            </div>
        </div>
    </Section>
</template>