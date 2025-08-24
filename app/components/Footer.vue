<script setup lang="ts">
async function update() {
    await Promise.all([updateUsers(true), updateSeasons(true)]);
}
</script>

<template>
    <footer class="footer sm:footer-horizontal mx-auto w-full text-base-content text-xl mb-20 p-10 max-w-screen-xl">
        <aside>
            <div class="flex items-center gap-5 pb-2">
                <NuxtImg src="dhs.png" alt="dublin high school logo" width="60" height="60" class="inline" />
                <NuxtImg src="gfr.png" alt="gael force robotics logo" width="50" height="50" class="inline" />
            </div>
            <p>
                <span class="gfr-gradient font-semibold">Gael Force Robotics</span>
                <br>
                Since 2010
                <br>
                Developed by Saketh
            </p>
            <Socials :width="6" :gap="2" discord="https://discord.gg/DShA3vWjGX" instagram="gfr5327" github="humanfriend22/gfr-website" />
            <DevOnly>
                <button class="btn btn-sm text-gray-400 hover:text-gray-300" @click="update">Force Update Data</button>
            </DevOnly>
        </aside>
        <nav>
            <h1 class="footer-title">Explore</h1>
            <a class="link hover:text-blue-500 duration-200 no-underline">About Us</a>
            <a class="link hover:text-blue-500 duration-200 no-underline">Officers</a>
            <a class="link hover:text-blue-500 duration-200 no-underline">Blog</a>
            <a class="link hover:text-blue-500 duration-200 no-underline" href="/#contact">Contact</a>
        </nav>
        <nav>
            <h1 class="footer-title">Events</h1>
            <a class="link hover:text-blue-500 duration-200 no-underline">Game Day</a>
            <a class="link hover:text-blue-500 duration-200 no-underline">Battle of the Bay</a>
            <a class="link hover:text-blue-500 duration-200 no-underline">Girl Powered</a>
        </nav>
        <nav>
            <h1 class="footer-title">Teams</h1>
            <a class="link hover:text-blue-500 duration-200 no-underline">Resurgence</a>
            <a class="link hover:text-blue-500 duration-200 no-underline">Kittens</a>
            <a class="link hover:text-blue-500 duration-200 no-underline">Ascension</a>
            <a class="link hover:text-blue-500 duration-200 no-underline">Velocity</a>
        </nav>
    </footer>
</template>