<template>
    <div class="drawer drawer-end h-screen w-screen">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <ClientOnly>
                <div class="stick top-0 z-50 bg-red-600/80 text-white font-mono font-semibold text-center py-2 text-lg" v-if="site.bannerMarkdown && site.bannerMarkdown !== ''">
                    <p class="font-semibold banner-container" v-html="renderBannerMarkdown(site.bannerMarkdown)"></p>
                </div>
            </ClientOnly>
            <slot />
        </div>
        <div class="drawer-side drawer-end z-60">
            <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 min-h-full w-80 p-4">
                <li>
                    <NuxtLink to="/about">
                        <HeaderLink>About</HeaderLink>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/teams">
                        <HeaderLink>Teams</HeaderLink>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/events">
                        <HeaderLink>Events</HeaderLink>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/blog">
                        <HeaderLink>Blog</HeaderLink>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact">
                        <HeaderLink>Contact</HeaderLink>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<style>
.banner-container a {
    text-decoration: underline;
}
</style>