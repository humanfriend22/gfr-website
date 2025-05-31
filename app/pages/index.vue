<template>
    <PageContainer>
        <Hero>
            <template v-slot:title>
                Dublin High's
                <span class="gfr-title">Gael Force Robotics</span>
            </template>
            <template v-slot:text>
                We are a <span class="font-extrabold">student-run</span> robotics club at Dublin High School that competes in the VEX Robotics Competition.
                Our community is diverse, inclusive, and welcoming to all students interested in STEM, exploring who they are, or just looking to have fun.
            </template>
            <Tilt :repel-at-mouse="false" :horizontal-tilt-angle="30" :vertical-tilt-angle="30">
                <NuxtImg class="rounded-lg ring-4 ring-gray-700" src="/gfr-worlds-2023.jpg" alt="GFR at 2023 worlds" priority />
            </Tilt>
        </Hero>
    </PageContainer>

</template>