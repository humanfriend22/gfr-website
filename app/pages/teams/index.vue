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
                <div class="grid grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-2 max-h-[60vh]" v-if="currentSeason">
                    <TeamCard v-for="team of currentSeason.teams" :team="team" :seasonId="currentSeason.id" />
                </div>
            </div>
        </div>
    </Section>
</template>