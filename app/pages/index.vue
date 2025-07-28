<template>
    <div>
        <Section class="flex flex-col justify-center items-center h-full min-h-screen">
            <div class="flex flex-col justify-center items-center flex-1 w-full">
                <Hero class="my-auto">
                    <template v-slot:title>
                        Dublin High's
                        <span class="gfr-gradient">Gael Force Robotics</span>
                    </template>
                    <template v-slot:text>
                        We are a <span class="font-extrabold">student-run</span> robotics club at Dublin High School that competes in the VEX Robotics Competition.
                        Our community is diverse, inclusive, and welcoming to all students interested in STEM, exploring who they are, or just looking to have fun.
                    </template>
                    <ClientOnly>
                        <Tilt :repel-at-mouse="false" :horizontal-tilt-angle="30" :vertical-tilt-angle="30">
                            <NuxtImg class="rounded-lg ring-4 ring-gray-700" :src="site.homeImage" alt="" priority />
                        </Tilt>
                    </ClientOnly>
                </Hero>
            </div>
        </Section>
        <Section class="flex flex-col justify-center items-center w-full">
            <h1 class="text-5xl text-center font-bold mb-15">GFR <span class="gfr-gradient">By The Numbers</span></h1>
            <div class="stats stats-vertical lg:stats-horizontal shadow lg:w-full mb-30">
                <div class="stat text-center">
                    <div class="stat-title">Years</div>
                    <div class="stat-value">14</div>
                    <div class="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div class="stat text-center">
                    <div class="stat-title">Members</div>
                    <div class="stat-value">31K</div>
                    <div class="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div class="stat text-center">
                    <div class="stat-title">Awards</div>
                    <div class="stat-value">31K</div>
                    <div class="stat-desc">Jan 1st - Feb 1st</div>
                </div>
                <div class="stat text-center">
                    <div class="stat-title">Another Metric</div>
                    <div class="stat-value">31K</div>
                    <div class="stat-desc">Jan 1st - Feb 1st</div>
                </div>
            </div>
        </Section>
    </div>

</template>