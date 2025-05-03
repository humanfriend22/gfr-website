<script setup lang="ts">
import Settings from '~/components/icons/Settings.vue';

definePageMeta({
    layout: 'blank',
    middleware: [
        function (to, from) {
            return true;
        }
    ]
});
</script>

<template>
    <div>
        <Header :is-admin="true" />
        <div class="max-w-screen-xl mx-auto px-3">
            <ul class="menu bg-base-200 rounded-box w-56">
                <li><a>Home</a></li>
                <li><a>Roles</a></li>
                <li>
                    <NuxtLink>Teams</NuxtLink>
                </li>
                <li><a>Home</a></li>
                <li><a>Setttings</a></li>
            </ul>
        </div>
    </div>
</template>