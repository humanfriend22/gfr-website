<script setup lang="ts">
defineProps<{
    blog: Blog;
    content: string;
}>();
</script>

<template>
    <div class="mx-auto md:mx-4 lg:mx-auto h-full flex flex-col gap-4">
        <h1 class="font-bold text-3xl lg:text-5xl">{{ blog?.title }}</h1>
        <p class="text-gray-400">{{ blog?.description }}</p>
        <div class="flex flex-row justify-between w-full">
            <div class="flex flex-col gap-1 text-sm w-fit">
                <span class="text-gray-100">{{ blog?.author }}</span>
                <span class="text-gray-400">{{ formatDate(blog?.date) }}</span>
                <span class="flex flex-row justify-center items-center text-gray-100 mt-2 underline">
                    <!-- <MapPin class="w-4 h-4" /> -->
                    {{ blog?.location }}
                </span>
            </div>
            <div class="flex flex-col gap-2">
                <NuxtLink class="btn btn-sm bg-gfr-red" v-if="blog.volunteer_link && blog.volunteer_link !== ''" :to="blog.volunteer_link" target="_blank">Volunteer</NuxtLink>
                <NuxtLink class="btn btn-sm bg-gfr-blue" v-if="blog.signup_link && blog.signup_link !== ''" :to="blog.signup_link" target="_blank">Sign Up</Nuxtlink>
            </div>
        </div>
        <div>
            <NuxtImg :src="blog?.image" alt="blog image preview" class="h-fit rounded-box w-full" />
        </div>
        <div class="prose lg:prose-xl w-full" v-html="content"></div>
    </div>
</template>