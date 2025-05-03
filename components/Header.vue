<script setup lang="ts">
const { isAdmin } = defineProps({
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const appConfig = useAppConfig();
</script>

<template>
    <div class="flex items-center lg:justify-center h-24 w-full max-w-screen-xl mx-auto sticky top-0 left-0 z-10 text-primary bg-gradient-to-b from-black/80 to-black/1">
        <NuxtLink to="/" class="flex items-center gap-5 text-lg font-extrabold tracking-wide sm:text-lg">
            <NuxtImg src="gfr.png" width="50" height="50" class="inline" />
            <h1 class="gfr-title bg-clip-text text-transparent bg-gradient-to-r">
                {{ isAdmin ? 'Admin Panel' : 'Gael Force Robotics' }}
            </h1>
        </NuxtLink>

        <!-- Desktop -->
        <div id="links" class="ml-auto items-center justify-end hidden lg:flex">
            <NuxtLink v-if="!isAdmin" v-for="(link, name) in appConfig.links" :key="name" :to="link" class="mx-4 text-lg font-[550] tracking-wide text-white hover:text-[#d94c4e] duration-300">
                {{ name }}
            </NuxtLink>
            <button class="btn" v-else>Logout</button>
        </div>
        <!-- Mobile -->
        <label id="drawer-button" for="my-drawer-3" aria-label="open sidebar" class="btn btn-square ml-auto lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-6 w-6 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </label>
    </div>
</template>