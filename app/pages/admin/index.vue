<script setup lang="ts">
import markdownit from 'markdown-it';

definePageMeta({
    layout: 'admin'
});

const homepageImage = ref<File | null>(null);


const md = new markdownit({
    html: false,
    typographer: false,
}).disable(['image', 'heading', 'code', 'blockquote', 'list', 'table']).use((md) => {
    const allowed = ['em', 'strong', 'link_open', 'link_close', 'text', 'inline'];
    md.core.ruler.after('inline', 'sanitize', (state) => {
        console.log(state, state.tokens)
        state.tokens = state.tokens.filter(token => allowed.includes(token.type));
    });
});

const unsafeMarkdown = ref('');
watch(unsafeMarkdown, (newValue) => {
    console.log(md.renderInline(newValue));
    siteData.value.bannerHTML = md.renderInline(newValue);
});
</script>

<template>
    <dialog id="homepage_preview" class="modal">
        <div class="modal-box w-[100rem] max-w-7xl">
            <h3 class="text-lg font-bold">Homepage</h3>
            <Hero class="my-auto p-10">
                <template v-slot:title>
                    Dublin High's
                    <span class="gfr-gradient">Gael Force Robotics</span>
                </template>
                <template v-slot:text>
                    We are a <span class="font-extrabold">student-run</span> robotics club at Dublin High School that competes in the VEX Robotics Competition.
                    Our community is diverse, inclusive, and welcoming to all students interested in STEM, exploring who they are, or just looking to have fun.
                </template>
                <Tilt :repel-at-mouse="false" :horizontal-tilt-angle="30" :vertical-tilt-angle="30">
                    <img class="rounded-lg ring-4 ring-gray-700" alt="" priority />
                </Tilt>
            </Hero>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>

    <Section class="px-5 flex flex-col gap-4">
        <div class="flex flex-col gap-3">
            <h3 class="font-bold text-2xl">Home Image</h3>
            <!-- <div class="w-34 h-0.5 bg-gray-600"></div> -->
            <p class="text-slate-400">Select an image to display on the homepage.</p>
            <div class="flex flex-row gap-2">
                <input type="file" class="file-input" />
                <button class="btn bg-[var(--gfr-blue)]" onclick="homepage_preview.show()">Preview</button>
            </div>
        </div>
        <div class="flex flex-col gap-3">
            <h3 class="font-bold text-2xl">Site Banner</h3>
            <!-- <div class="w-34 h-0.5 bg-gray-600"></div> -->
            <p class="text-slate-400">Write a one liner in Markdown to display at the top of the site. A preview will appear on this page when you edit below.</p>
            <div class="flex flex-row gap-2">
                <input type="text" placeholder="Type here" class="input w-[40rem]" v-model="unsafeMarkdown" />
                <button class="btn bg-[var(--gfr-blue)]">Save</button>
            </div>
        </div>
        <div class="flex flex-col gap-3">
            <h3 class="font-bold text-2xl">Current Season</h3>
            <!-- <div class="w-34 h-0.5 bg-gray-600"></div> -->
            <p class="text-slate-400">Write a one liner in Markdown to display at the top of the site. A preview will appear on this page when you edit below.</p>
            <div class="flex flex-row gap-2">
                <input type="text" placeholder="Type here" class="input w-[40rem]" v-model="unsafeMarkdown" />
                <button class="btn bg-[var(--gfr-blue)]">Save</button>
            </div>
        </div>
    </Section>
</template>