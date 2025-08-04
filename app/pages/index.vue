<script setup lang="ts">

</script>

<template>
    <div>
        <Section class="flex flex-col justify-center items-center min-h-screen" id="home">
            <Hero class="mb-30">
                <template v-slot:title>
                    Dublin High's
                    <span class="gfr-gradient">Gael Force Robotics</span>
                    <br>
                </template>
                <template v-slot:text>
                    We are a <span class="font-extrabold">student-run</span> robotics club at Dublin High School that competes in the VEX Robotics Competition.
                    Our community is diverse, inclusive, and welcoming to all students interested in STEM, exploring who they are, or just looking to have fun.
                </template>
                <ClientOnly>
                    <Tilt :repel-at-mouse="false" :horizontal-tilt-angle="20" :vertical-tilt-angle="20">
                        <NuxtImg class="rounded-lg ring-4 ring-gray-700" :src="site.homeImage" alt="Homepage image" priority />
                    </Tilt>
                </ClientOnly>
            </Hero>
        </Section>
        <Section class="px-20 mb-30" id="programs">
            <h1 class="text-4xl text-center font-bold mb-15">
                Our <span class="gfr-gradient">Programs</span>
            </h1>
            <div class="grid grid-cols-2 gap-5">
                <div v-for="i in Array(6)" class="h-[400px] relative group overflow-hidden w-full border-4 p-4 rounded-box border-base-200/90 bg-cover hover:border-[var(--gfr-blue)]  duration-400">
                    <div class="w-full h-full absolute left-0 top-0 opacity-40 group-hover:opacity-60 duration-400">
                        <NuxtImg src="girlpowered2024.jpg" class="h-full w-full object-cover" />
                    </div>
                    <div class="h-full w-full flex flex-col justify-center items-center relative z-10">
                        <h2 class="text-2xl font-bold text-white mb-2">Program {{ i }}</h2>
                        <p class="text-gray-300 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"
                        class="absolute right-5 bottom-3 h-8 w-8 outlinedText md:h-10 md:w-10 opacity-0 group-hover:opacity-100 duration-400 cursor-pointer z-40" height="1em" width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z">
                        </path>
                    </svg>
                </div>
            </div>
        </Section>
        <Section class="flex flex-col justify-center items-center w-full" id="by-the-numbers">
            <h1 class="text-4xl text-center font-bold mb-15">
                <span class="gfr-gradient">By The Numbers</span>
            </h1>

            <div class="stats stats-vertical lg:stats-horizontal shadow lg:w-full mb-30">
                <div class="stat text-center">
                    <div class="stat-title">Years</div>
                    <div class="stat-value">{{ new Date().getFullYear() - 2010 }}</div>
                    <div class="stat-desc">2010 - present</div>
                </div>
                <div class="stat text-center">
                    <div class="stat-title">Awards</div>
                    <div class="stat-value">180+</div>
                    <div class="stat-desc">Jan 1st - Feb 1st</div>
                </div>
                <div class="stat text-center">
                    <div class="stat-title">Worlds Quals</div>
                    <div class="stat-value">25+</div>
                    <div class="stat-desc">Jan 1st - Feb 1st</div>
                </div>
                <div class="stat text-center">
                    <div class="stat-title">Events Hosted</div>
                    <div class="stat-value">31K</div>
                    <div class="stat-desc">Jan 1st - Feb 1st</div>
                </div>
            </div>
        </Section>
        <Section class="max-w-3xl mx-auto mb-30" id="join-us">
            <h1 class="text-4xl text-center font-bold mb-15">
                <span class="gfr-gradient">Join Us</span>
            </h1>
            <ClientOnly>
                <JoinUsStepsContent />
            </ClientOnly>
        </Section>
    </div>
</template>