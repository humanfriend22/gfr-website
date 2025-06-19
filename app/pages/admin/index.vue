<script setup lang="ts">
import Settings from '~/components/icons/Settings.vue';

definePageMeta({
    layout: 'admin'
});

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const page = computed(() => (capitalize(useRoute().path.split('/').findLast(() => true)!)));
</script>

<template>
    <div>
        <Section class="px-5">
            <div class="flex flex-col gap-3">
                <h3 class="font-bold text-2xl">Site Banner</h3>
                <div class="w-48 h-0.5 bg-gray-600"></div>
                <p class="text-slate-400">Write a one liner in Markdown to display at the top of the site. A preview will appear on this page when you edit below.</p>
                <input type="text" placeholder="Type here" class="input" />
            </div>
        </Section>
    </div>

</template>