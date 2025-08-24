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
            <FooterLink link="/#join-us">Join Us</FooterLink>
            <FooterLink link="/officers">Officers</FooterLink>
            <FooterLink link="/blog">Blog</FooterLink>
            <FooterLink link="/#contact">Contact</FooterLink>
        </nav>
        <nav>
            <h1 class="footer-title">Programs & Events</h1>
            <ClientOnly>
                <FooterLink v-for="program in programBlogs" :link="'/blog/' + program.id">
                    {{ program.title }}
                </FooterLink>
            </ClientOnly>
        </nav>
        <nav>
            <h1 class="footer-title">Teams</h1>
            <ClientOnly>
                <FooterLink v-for="team of currentSeason?.teams" :link="'/teams/' + currentSeason.id + '/' + team.letter">{{ team.name }}</FooterLink>
            </ClientOnly>
        </nav>
    </footer>
</template>