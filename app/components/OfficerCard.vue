<script setup lang="ts">
const { user } = defineProps<{
    user: User | null;
}>();
</script>

<template>
    <div class="w-full p-5 gap-6 overflow-hidden cursor-pointer rounded-md border-2 border-[var(--primary-background-color)] duration-300 bg-zinc-950 hover:bg-zinc-900">
        <div class="flex items-center justify-center flex-col">
            <ClientOnly>
                <TeamLogoDisplay src="https://placehold.co/400" :width="150" />

                <div class="py-2.5 flex flex-col gap-2">
                    <div class="text-white text-xl font-semibold text-wrap text-center">{{ user?.name }}</div>
                    <div class="text-gray-500 text-sm font-normal text-center">{{ user?.bio || '' }}</div>
                </div>
            </ClientOnly>
        </div>
    </div>
</template>