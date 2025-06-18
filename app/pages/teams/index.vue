<script setup lang="ts">
const teams = [
    {
        name: 'Resurgence',
        logo: 'RLogo.png',
        captains: ['Rishi Shirol', 'Saketh Chakravadhanula']
    },
    {
        name: 'Velocity',
        logo: 'VLogo.png',
        captains: ['Sammy Sadheesh', 'Connor Wong-Woo']
    },
    {
        name: 'Ascension',
        logo: 'ALogo.jpg',
        captains: ['Rishi Thota']
    },
    {
        name: 'Kreamers',
        logo: 'KLogo.png',
        captains: ['Eric Tao', 'Jack Wu']
    }
]
</script>

<template>
    <Section>
        <div class="min-h-screen flex flex-col items-center justify-center px-6 py-20">
            <!-- Title -->
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    Meet Our <span class="text-[var(--gfr-red)]">Competition</span> Teams
                </h1>
            </div>

            <!-- Teams Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
                <div 
                    v-for="team in teams" 
                    :key="team.name"
                    class="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                    <div class="flex items-center gap-6">
                        <!-- Team Logo -->
                        <div class="flex-shrink-0">
                            <div class="w-24 h-24 md:w-28 md:h-28 rounded-xl bg-gray-800/50 flex items-center justify-center overflow-hidden">
                                <NuxtImg 
                                    :src="team.logo" 
                                    :alt="`${team.name} logo`"
                                    width="112" 
                                    height="112" 
                                    class="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                        </div>

                        <!-- Team Info -->
                        <div class="flex-1 min-w-0">
                            <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
                                {{ team.name }}
                            </h2>
                            <div class="text-gray-400 text-sm md:text-base">
                                <template v-if="team.captains.length === 1">
                                    {{ team.captains[0] }}
                                </template>
                                <template v-else>
                                    {{ team.captains.join(' & ') }}
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Section>
</template>

<style scoped>
/* Additional hover effects */
.bg-gray-900\/80:hover {
    background-color: rgba(17, 24, 39, 0.9);
}
</style>