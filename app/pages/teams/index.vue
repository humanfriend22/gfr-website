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
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                    Meet Our <span class="text-[var(--gfr-red)]">Competition</span> Teams
                </h1>
            </div>

            <!-- Teams Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full">
                <div 
                    v-for="team in teams" 
                    :key="team.name"
                    class="bg-gray-900/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl"
                >
                    <div class="flex flex-col items-center text-center">
                        <!-- Team Logo -->
                        <div class="mb-6">
                            <div class="w-32 h-32 rounded-2xl bg-gray-800/50 flex items-center justify-center overflow-hidden border border-gray-700/50">
                                <NuxtImg 
                                    :src="team.logo" 
                                    :alt="`${team.name} logo`"
                                    width="120" 
                                    height="120" 
                                    class="w-full h-full object-contain rounded-2xl"
                                />
                            </div>
                        </div>

                        <!-- Team Info -->
                        <div class="w-full">
                            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                                {{ team.name }}
                            </h2>
                            <div class="text-gray-400 text-lg">
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
.bg-gray-900\/90:hover {
    background-color: rgba(17, 24, 39, 0.95);
}
</style>