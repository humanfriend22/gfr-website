<script setup lang="ts">
defineProps<{
    team: Team;
}>();
</script>

<template>
    <div class="w-full p-5 inline-flex gap-6 overflow-hidden cursor-pointer border-2 rounded-md border-[var(--primary-background-color)] duration-300 bg-zinc-950 hover:bg-zinc-900" :key="team.name">
        <ImageDisplay :src="team.logo" class="w-34 h-34" />

        <div class="py-2.5 flex flex-col md:gap-2">
            <div class="text-white text-2xl md:text-4xl font-semibold leading-10">{{ team.name }}</div>
            <div class="text-gray-500 text-base md:text-xl font-normal">{{team.captains.map(uid => userFromUID(uid)?.name).join(' & ')}}</div>
        </div>
    </div>
</template>