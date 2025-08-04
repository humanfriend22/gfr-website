<script setup lang="ts">
const iframe = useTemplateRef('iframe');

// function load() {
//     const doc = iframe.value?.contentDocument;
//     if (doc) doc.querySelector<HTMLDivElement>('')?.style.setProperty('margin-left', '5px');
// }
</script>

<template>
    <div>
        <Section class="flex flex-col justify-center items-center min-h-screen" id="home">
            <Hero class="mb-30">
                <template v-slot:title>

                    <span class="gfr-gradient">Become a Sponsor</span> and
                    Support Our Work
                    <br>
                </template>
                <template v-slot:text>
                    We are a <span class="font-extrabold">student-run</span> robotics club at Dublin High School that competes in the VEX Robotics Competition.
                    Our community is diverse, inclusive, and welcoming to all students interested in STEM, exploring who they are, or just looking to have fun.
                </template>
                <ClientOnly>
                    <div>
                        <iframe src="https://drive.google.com/file/d/1MKBLPuLKCvSJ0V5Ne6pIyJen5JrRwoFl/preview" width="600" height="500" class="px-3" ref="iframe"></iframe>
                    </div>
                </ClientOnly>
            </Hero>
        </Section>
    </div>
</template>

<style>
iframe {
    .ndfHFb-c4YZDc-cYSp0e-s2gQvd {
        margin-left: 5px;
    }
}
</style>