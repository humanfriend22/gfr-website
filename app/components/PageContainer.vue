<script setup lang="ts">
import { useSlots } from 'vue'

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