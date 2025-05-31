<script setup lang="ts">
import Settings from '~/components/icons/Settings.vue';

definePageMeta({
    layout: 'blank',
    middleware: [
        function (to, from) {
            const app = useNuxtApp();

        }
    ]
});

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const page = computed(() => (capitalize(useRoute().path.split('/').findLast(() => true)!)));
</script>

<template>
    <div>
        <Header :is-admin="true">
            Admin Panel
        </Header>
        <div class="max-w-screen-xl mx-auto px-4">
            <div class="hidden lg:flex gap-4">
                <ul class="menu bg-base-200 rounded-box lg:w-56 w-full h-96">
                    <li v-for="name of ['Seasons', 'Users', 'Teams']" :key="name" class="mb-1">
                        <NuxtLink :to="'/admin/' + name.toLowerCase()" :class="page === `${name}` ? 'bg-blue-700' : ''">{{ name }}</NuxtLink>
                    </li>
                </ul>
                <div class="w-full hidden md:block">
                    <h1 class="font-bold text-3xl">{{ page }}</h1>
                    <div class="divider w-full"></div>
                    <div class="px-2">
                        <NuxtPage />
                    </div>
                </div>
            </div>
            <div class="lg:hidden">Woah, the admin panel is a dangerous place. Let's do this on a computer.</div>
        </div>
    </div>
</template>