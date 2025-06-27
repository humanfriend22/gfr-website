<script setup lang="ts">
const teams = [
    {
        name: 'Resurgence',
        captains: 'Rishi Shirol & Saketh Chakravadhanula',
        logo: 'RLogo.png',
    },
    {
        name: 'Velocity',
        captains: 'Sammy Sadheesh & Connor Wong-Woo',
        logo: 'VLogo.png',
    },
    {
        name: 'Ascension',
        captains: 'Rishi Thota',
        logo: 'ALogo.jpg',
    },
    {
        name: 'Kreamers',
        captains: 'Jack Wu & Eric Tao',
        logo: 'KLogo.png',
    },
];
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
                    <NuxtLink v-for="team in teams" :to="'/teams/' + team.name.toLowerCase()">
                        <div class=" p-5 inline-flex gap-6 overflow-hidden cursor-pointer border-2 rounded-md border-[var(--primary-background-color)] duration-300 hover:border-gray-700"
                            :key="team.name">
                            <NuxtImg class="h-36 md:h-48 rounded-md bg-black" :src="team.logo" />

                            <div class="py-2.5 flex flex-col gap-2">
                                <div class="text-white text-2xl md:text-4xl font-semibold leading-10">5327{{ team.name[0] }}</div>
                                <div class="text-gray-500 text-md md:text-2xl font-normal">{{ team.captains }}</div>
                            </div>
                        </div>
                    </NuxtLink>

                </div>
            </div>
        </div>
    </Section>
</template>