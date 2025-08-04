<script setup lang="ts">
defineProps<{
    user: User | null;
    title: keyof Season['officers'];
}>();
</script>

<template>
    <div class="w-full p-5 gap-6 overflow-hidden cursor-pointer rounded-md border-2 border-[var(--primary-background-color)] duration-300 bg-zinc-950 hover:bg-zinc-900">
        <div class="flex flex-col gap-2 items-center justify-center">
            <ClientOnly v-if="user">
                <div class="text-white text-lg font-semibold text-wrap text-center">{{ officerTitleMap[title] }}</div>

                <ImageDisplay :src="user.pfp" class="w-2/3 max-w-[150px]" circle />

                <div class="py-2.5 flex flex-col gap-2">
                    <div class="text-white text-lg font-semibold text-wrap text-center">{{ user?.name }}</div>
                    <div class="text-gray-500 text-sm font-normal text-center">{{ user?.bio || '' }}</div>
                </div>
            </ClientOnly>
        </div>
    </div>
</template>