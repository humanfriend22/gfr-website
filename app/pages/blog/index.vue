<template>
    <Section>
        <div class="flex flex-col justify-center items-center px-4 gap-5 h-fit">
            <div class="text-2xl font-bold">Events</div>
            <div class="text-center text-gray-500 text-lg">
                <p>Our event team works very hard to host multiple events every season for our community.</p>
            </div>
            <div class="flex flex-col w-full events h-fit">
                <div class="flex flex-row w-full gap-1 h-96">
                    <!-- Left side -->
                    <div class="flex-1">
                        <div class="w-full text-right">
                            <span class="text-gray-400 text-sm">7/10/2025</span>
                        </div>
                    </div>

                    <!-- Center divider -->
                    <div class="flex flex-col justify-center items-center w-6 h-full mb-5">
                        <div class="h-1.5 w-0.5 bg-gray-400 small-line"></div>
                        <div class="w-3 aspect-square bg-gray-400"></div>
                        <div class="h-full w-0.5 bg-gray-400"></div>
                    </div>

                    <!-- Right side -->
                    <div class="flex-1 h-full">
                        <div class="flex flex-col justify-center items-start h-full">
                            <h1 class="font-bold text-3xl">Girl Powered 2024</h1>
                            <NuxtImg src="girlpowered2024.jpg" class="rounded-md flex-1 mt-2 h-36" />
                            <div class="mt-2">
                                <p class="text-gray-400 text-md mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor non felis ac imperdiet. Aliquam consequat, augue nec finibus lacinia, nibh est porta urna, sed
                                    suscipit turpis leo ut nunc libero.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row w-full gap-1 h-96">
                    <div class="flex-1 h-full">
                        <div class="flex flex-col justify-center items-end h-full">
                            <h1 class="font-bold text-3xl">Girl Powered 2024</h1>
                            <NuxtImg src="girlpowered2024.jpg" class="rounded-md flex-1 mt-2 h-36" />
                            <div class="mt-2">
                                <p class="text-gray-400 text-md">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor non felis ac imperdiet. Aliquam consequat, augue nec finibus lacinia, nibh est porta urna, sed
                                    suscipit turpis leo ut nunc libero.
                                </p>
                            </div>
                        </div>
                    </div>


                    <!-- Center divider -->
                    <div class="flex flex-col justify-center items-center w-6 h-full">
                        <div class="h-1.5 w-0.5 bg-gray-400 small-line"></div>
                        <div class="w-3 aspect-square bg-gray-400"></div>
                        <div class="h-full w-0.5 bg-gray-400"></div>
                    </div>

                    <!-- Right side -->
                    <!-- Left side -->
                    <div class="flex-1">
                        <div class="w-full text-left">
                            <span class="text-gray-400 text-sm">7/10/2025</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col px-2 w-full events md:hidden">
                <div class="flex flex-row gap-x-2 min-h-48 w-full mt-1.5">
                    <div class="flex flex-col justify-center items-center">
                        <div class="h-1.5 w-0.5 bg-gray-400 small-line"></div>
                        <div class="w-3 aspect-square bg-gray-400"></div>
                        <div class="h-full w-0.5 bg-gray-400"></div>
                    </div>
                    <div class="flex-grow mb-5">
                        <span class="text-gray-400 text-sm">7/10/2025</span>
                        <h1 class="font-bold text-3xl">Girl Powered 2024</h1>
                        <NuxtImg src="girlpowered2024.jpg" class="rounded-md mt-2" />
                        <div class="mt-2">
                            <p class="text-gray-400 text-md">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor non felis ac imperdiet. Aliquam consequat, augue nec finibus lacinia, nibh est porta urna, sed
                                suscipit turpis leo ut nunc libero.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row gap-x-2 min-h-48 w-full">
                    <div class="flex flex-col justify-center items-center">
                        <div class="h-1.5 w-0.5 bg-gray-400 small-line"></div>
                        <div class="w-3 aspect-square bg-gray-400"></div>
                        <div class="h-full w-0.5 bg-gray-400"></div>
                    </div>
                    <div class="flex-grow mb-5">
                        <span class="text-gray-400 text-sm">7/10/2025</span>
                        <h1 class="font-bold text-3xl">Girl Powered 2024</h1>
                        <NuxtImg src="girlpowered2024.jpg" class="rounded-md mt-2" />
                        <div class="mt-2">
                            <p class="text-gray-400 text-md">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor non felis ac imperdiet. Aliquam consequat, augue nec finibus lacinia, nibh est porta urna, sed
                                suscipit turpis leo ut nunc libero.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Section>
</template>

<style scoped>
.events>div:first-child .small-line {
    background-color: black;
}
</style>