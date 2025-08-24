<script setup lang="ts">
import { Trophy, Check } from 'lucide-vue-next';

const benefits = [
    "Logo on Website and Publications",
    "Mentions during event opening ceremonies",
    "Logo on all promotional material",
    "Logo on Merchandise",
    "Logo on Emails to students and Parents",
    "Invitation to Gael Force Robotics Events",
    "Access to Establish Event Booths",
    "Tags in all Social Media Posts",
    "Request GFR @ company events",
    "Logo on all competition robots"
];

const tiers = [
    { name: 'Bronze', amount: '$500 - $999', color: 'amber-600', benefits: benefits.slice(0, 4) },
    { name: 'Silver', amount: '$1,000 - $4,999', color: 'zinc-400', benefits: ['All Bronze Benefits', ...benefits.slice(4, 8)] },
    {
        name: 'Gold', amount: '$5,000+', color: 'yellow-500', benefits: ['All Silver Benefits', ...benefits.slice(8, 11)]
    }
];
</script>

<template>
    <div>
        <Section class="flex flex-col justify-center items-center min-h-screen" id="sponsor">
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
                <ClientOnly class="hidden md:block">
                    <div>
                        <iframe src="https://drive.google.com/file/d/1MKBLPuLKCvSJ0V5Ne6pIyJen5JrRwoFl/preview" width="600" height="500" class="px-3" ref="iframe"></iframe>
                    </div>
                </ClientOnly>
            </Hero>
        </Section>
        <Section class="mb-30" id="tiers">
            <h1 class="text-4xl text-center font-bold mb-15">
                Sponsorship <span class="gfr-gradient">Tiers</span>
            </h1>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <div :class="`flex flex-col pt-20 mx-10 md:mx-0 items-center transition-colors group rounded-box border-4 select-none border-base-200/90 hover:border-${tier.color} duration-400 p-4`"
                    v-for="tier in tiers">
                    <Trophy :class="`w-12 h-12 text-${tier.color} mb-4`" />
                    <h3 :class="`text-xl font-bold text-${tier.color} mb-2`">{{ tier.name }}</h3>
                    <p class="text-gray-300 text-md mb-4">{{ tier.amount }}</p>
                    <div class="text-sm text-gray-400 text-center">
                        <ul class="list-none ml-7">
                            <li class="flex flex-row items-center gap-2" v-for="benefit in tier.benefits" :key="benefit">
                                <div class="flex flex-col text-gfr-blue">
                                    <Check class="w-6 h-6 mt-0.5" />
                                </div>
                                <p class="text-start">{{ benefit }}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

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