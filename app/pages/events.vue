<template>
    <Section>
        <div class="h-full md:justify-center items-center flex flex-col px-5">
            <div class="flex flex-col justify-center items-center gap-7 w-full h-full md:px-5 mt-10">
                <div class="justify-start font-bold md:text-5xl text-2xl">
                    Check Out Our <span class="gfr-gradient">Events</span>
                </div>
                <div class="w-3/4 h-0 mx-auto relative">
                    <div class="w-full h-0 left-0 top-0 absolute outline-1 outline-offset-[-0.50px] outline-gray-400"></div>
                </div>
                <div class="md:grid md:grid-cols-3 md:gap-5">
                    <div class="card bg-base-100 image-full w-96 shadow-sm" v-for="i in Array(10)">
                        <figure>
                            <NuxtImg src="gfr-summer-newsletter.png" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">Qualcomm Kids Booth</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div class="card-actions justify-end">
                                <button class="btn btn-primary">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </Section>
</template>