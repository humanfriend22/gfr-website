<script setup lang="ts">
const links = useRuntimeConfig().public.links;

function closeDrawer() {
    const drawerButton = document.getElementById('drawer-button') as HTMLLabelElement;
    drawerButton.click();
};
</script>

<template>
    <div class="drawer drawer-end h-screen w-screen">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <slot />
        </div>
        <div class="drawer-side drawer-end z-60">
            <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 min-h-full w-80 p-4">
                <li v-for="(link, name) in links" @click="closeDrawer">
                    <NuxtLink :key="name" :to="link" class="mx-4 text-lg font-[550] tracking-wide text-white hover:text-[var(--gfr-red)] duration-300">
                        {{ name }}
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>