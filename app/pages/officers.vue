<script setup lang="ts">
const season = computed(() => currentSeason.value);
</script>

<template>
    <Section>
        <div class="h-full md:justify-center items-center flex flex-col px-5">
            <div class="flex flex-col justify-center items-center gap-7 w-full h-full md:mx-0 mt-10">

                <div class="justify-start font-bold md:text-5xl text-2xl">
                    <ClientOnly>
                        Meet Our Club <span class="gfr-gradient" v-if="season">Officers</span>
                    </ClientOnly>
                </div>
                <Divider class="w-2/3" />

                <div class="grid grid-cols-3 w-2/3">
                    <ClientOnly>
                        <OfficerCard :user="userFromUID(uid)" v-for="uid of Object.values(season.officers || [])" v-if="season" />
                    </ClientOnly>
                </div>
            </div>
        </div>
    </Section>
</template>