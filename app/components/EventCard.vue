<script setup lang="ts">
const { event, imageOverride } = defineProps<{
    event: WebsiteEvent;
    imageOverride?: string;
    clickHandler: (event: WebsiteEvent) => void;
}>();

const image = computed(() => imageOverride || event.image || 'https://placehold.co/400');

onBeforeUpdate(() => {
    console.log(event.start, event.end);
})
</script>

<template>
    <div class="relative">
        <div class="card bg-base-100 image-full shadow-sm w-full h-full cursor-pointer transition-all duration-300 hover:brightness-140" @click="clickHandler(event)">
            <figure :class="image ? '' : 'bg-gray-950'">
                <NuxtImg :src="image" />
            </figure>
            <div class="card-body min-w-0 z-10">
                <h2 class="card-title break-words text-xl">{{ event.title }}</h2>

                <div>
                    <p class="text-sm">{{ event.description }}</p>
                    <span class="-ml-1 flex flex-row items-center gap-1 mt-4 text-sm text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        {{ event.location }}
                    </span>
                    <span class="-ml-1 flex flex-row items-center gap-1 mt-2 text-sm text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {{ formatDate(event.start, true) }}
                        <span v-if="event.start.getTime() !== event.end.getTime()"> - {{ formatDate(event.end, true) }}</span>
                    </span>
                </div>
            </div>

        </div>
        <div class="card-actions justify-end flex-wrap absolute bottom-4 right-4">
            <NuxtLink class="btn bg-gfr-red flex-shrink-0" v-if="event.volunteer_link !== ''" :to="event.volunteer_link" target="_blank">Volunteer</NuxtLink>
            <NuxtLink class="btn bg-gfr-blue flex-shrink-0" v-if="event.signup_link !== ''" :to="event.signup_link" target="_blank">Sign Up</Nuxtlink>
        </div>
    </div>
</template>
