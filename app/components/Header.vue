<script setup lang="ts">
const { isAdmin } = defineProps({
    isAdmin: {
        type: Boolean,
        default: false
    }
});

function handleLoginClick() {
    loginWithRedirect();
}

onMounted(() => {
    console.log(currentUser.value);
})
</script>

<template>
    <div class="flex items-center lg:justify-center h-24 w-full max-w-screen-xl mx-auto sticky top-0 left-0 z-30 text-primary bg-gradient-to-b from-black/80 to-black/1 px-3">
        <NuxtLink to="/" class="flex items-center gap-5 text-lg font-extrabold tracking-wide sm:text-lg">
            <NuxtImg src="gfr.png" width="50" height="50" class="inline" />
            <h1 class="gfr-gradient bg-clip-text text-transparent bg-gradient-to-r">
                <slot />
            </h1>
        </NuxtLink>

        <!-- Desktop -->
        <div id="links" class="ml-auto items-center justify-end hidden lg:flex">
            <NuxtLink to="/about">
                <HeaderLink>About</HeaderLink>
            </NuxtLink>
            <NuxtLink to="/teams">
                <HeaderLink>Teams</HeaderLink>
            </NuxtLink>
            <NuxtLink to="/events">
                <HeaderLink>Events</HeaderLink>
            </NuxtLink>
            <NuxtLink to="/blog">
                <HeaderLink>Blog</HeaderLink>
            </NuxtLink>
            <NuxtLink to="/contact">
                <HeaderLink>Contact</HeaderLink>
            </NuxtLink>
            <div>
                <HeaderLink v-if="!currentUser" @click="handleLoginClick">Login</HeaderLink>
                <div class="dropdown dropdown-end ml-2" v-else>
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" :src="currentUser!.photoURL!" />
                        </div>
                    </div>
                    <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a class="justify-between">
                                Profile
                                <span class="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a @click="logout">Logout</a></li>
                    </ul>
                </div>
            </div>

        </div>
        <!-- Mobile -->
        <label id="drawer-button" for="my-drawer-3" aria-label="open sidebar" class="btn btn-square ml-auto lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-6 w-6 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </label>
    </div>
</template>