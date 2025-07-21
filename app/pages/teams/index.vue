<script setup lang="ts">

</script>

<template>
    <Section>
        <div class="h-full md:justify-center items-center flex flex-col px-5">
            <div class="flex flex-col justify-center items-center gap-7 w-full h-full md:w-5/6 md:mx-0 mt-10">
                <div class="justify-start font-bold md:text-5xl text-2xl">
                    Meet Our <span class="gfr-gradient">Competition</span> Teams
                </div>
                <Divider />
                <div class="grid grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-2">
                    <NuxtLink v-for="team of currentSeason.teams" :to="'/teams/' + currentSeason.id + '/' + team.letter">
                        <div class="w-full p-5 inline-flex gap-6 overflow-hidden cursor-pointer border-2 rounded-md border-[var(--primary-background-color)] duration-300 hover:border-gray-700"
                            :key="team.name">
                            <TeamLogoDisplay class="h-36 md:h-48" :src="team.logo" />

                            <div class="py-2.5 flex flex-col gap-2">
                                <div class="text-white text-2xl md:text-4xl font-semibold leading-10">{{ team.name }}</div>
                                <div class="text-gray-500 text-md md:text-2xl font-normal">{{team.captains.map(uid => userFromUID(uid)?.name).join(' & ')}}</div>
                            </div>
                        </div>
                    </NuxtLink>

                </div>
            </div>
        </div>
    </Section>
</template>