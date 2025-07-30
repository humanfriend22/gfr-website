<script setup lang="ts">
const season = currentSeason.value;
</script>

<template>
    <Section>
        <div class="h-full md:justify-center items-center flex flex-col px-5">
            <div class="flex flex-col justify-center items-center gap-7 w-full h-full md:mx-0 mt-10">
                <div class="justify-start font-bold md:text-5xl text-2xl">
                    <span class="gfr-gradient">{{ formatSeasonId(season.id, false) }}</span> Overview
                </div>
                <Divider class="w-2/3" />
                <div class="grid grid-cols-3 w-full">
                    <div class="flex flex-col gap-2">
                        <TeamCard v-for="team of season.teams" :team="team" :seasonId="season.id" />
                    </div>
                </div>
            </div>
        </div>
    </Section>
</template>