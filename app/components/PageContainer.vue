<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots();

const children = slots.default ? slots.default() : [];
</script>

<template>
    <div class="drawer drawer-end h-screen w-screen">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
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
            <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 min-h-full w-80 p-4">
                <li v-for="(vnode, index) in children" :key="index">
                    <component :is="vnode" />
                </li>
                <!-- <li>
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
                </li> -->
            </ul>
        </div>
    </div>
</template>