<template>
    <Section>
        <div class="flex flex-col justify-center items-center px-4 h-fit">
            <div class="text-5xl font-bold mt-10">Events</div>
            <div class="text-center text-gray-500 text-lg">
                <p>Our event team works very hard to host multiple events every season for our community.</p>
            </div>
            <div class="hidden lg:flex flex-col w-full events-desktop h-fit pt-5">
                <BlogPreviewCard></BlogPreviewCard>
                <BlogPreviewCard left></BlogPreviewCard>
            </div>

            <div class="flex flex-col px-2 events-mobile lg:hidden" v-for="i in Array(10)">
                <div class="flex flex-row gap-x-2 h-fit w-full">
                    <div class="flex flex-col justify-center items-center">
                        <div class="h-1.5 w-0.5 bg-gray-400"></div>
                        <div class="w-3 aspect-square bg-gray-400"></div>
                        <div class="h-full w-0.5 bg-gray-400"></div>
                    </div>
                    <div class="flex-grow mb-5">
                        <span class="text-gray-400 text-sm">7/10/2025</span>
                        <h1 class="font-bold text-3xl">Girl Powered 2024</h1>
                        <NuxtImg src="girlpowered2024.jpg" class="rounded-md mt-2 max-h-36" />
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