<script setup lang="ts">
defineSlots<{
    default: any;
    links?: any;
}>();

function closeDrawer() {
    const drawer = document.getElementById('mobile-links-drawer') as HTMLInputElement;
    if (drawer) {
        drawer.checked = false;
    }
}
</script>

<template>
    <div class="drawer drawer-end h-screen w-screen">
        <input id="mobile-links-drawer" type="checkbox" class="drawer-toggle" aria-hidden="true" tabindex="-1" />
        <div class="drawer-content">
            <div class="min-h-screen">
                <div id="banner" class="stick top-0 z-50 bg-red-600/80 text-white font-mono font-semibold text-center py-2 text-lg" v-if="site.bannerMarkdown !== ''">
                    <p class="font-semibold banner-container" v-html="renderBannerMarkdown(site.bannerMarkdown)"></p>
                </div>
                <Header>
                    <slot name="links" />
                </Header>
                <!-- Content -->
                <div class="bg-[var(--primary-background-color)] w-full mx-auto min-h-screen overflow-y-scroll overflow-x-hidden sm:px-0 -mt-24 text-white">
                    <slot />
                </div>
                <Footer />
            </div>
        </div>
        <div class="drawer-side drawer-end z-60">
            <!-- <label for="mobile-links-drawer" aria-label="close sidebar" class="drawer-overlay"></label> -->
            <ul class="menu bg-base-200 min-h-full w-80 p-4">
                <li v-for="(vnode, index) in $slots.links?.()" :key="index" @click="closeDrawer">
                    <component :is="vnode" />
                </li>
            </ul>
        </div>
    </div>
</template>