<script setup lang="ts">
defineProps<{
    team: Team,
    seasonId: string;
}>();
</script>

<template>
    <NuxtLink :to="'/teams/' + seasonId + '/' + team.letter">
        <div class="w-full p-5 inline-flex gap-6 overflow-hidden cursor-pointer border-2 rounded-md border-[var(--primary-background-color)] duration-300 bg-zinc-950 hover:bg-zinc-900"
            :key="team.name">
            <TeamLogoDisplay :src="team.logo" />

            <div class="py-2.5 flex flex-col gap-2">
                <div class="text-white text-2xl md:text-4xl font-semibold leading-10">{{ team.name }}</div>
                <div class="text-gray-500 text-xl font-normal">{{team.captains.map(uid => userFromUID(uid)?.name).join(' & ')}}</div>
            </div>
        </div>
    </NuxtLink>
</template>