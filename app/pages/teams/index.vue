<script setup lang="ts">


</script>

<template>
    <Section>
        <div class="lg:flex h-body items-center justify-center">
            <div class="grid grid-cols-2 gap-4 w-full">
                <div v-for="i in Array(4)" class="text-white flex justify-center items-center border-4 rounded-xl border-gray-600 hover:border-gray-400 cursor-pointer duration-500">
                    <div class="grid grid-cols-1 gap-x-5 p-5">
                        <div class="flex">
                            <div class="w-full py-2 text-center">
                                <p class="h1 font-bold md:text-3xl text-xl">Resurgence</p>
                                <div class="w-fit">
                                    <NuxtImg src="RLogo.png" width="200" height="200" class="rounded-md" />
                                </div>
                                <p class="text-md mt-2">
                                    <i class="text-gray-400">
                                        <span class="">Led by </span>
                                        <span class="font-bold">Kaushik Chandolu</span>
                                    </i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Section>
</template>

<style scoped>
#background {
    background: url('/gfr-bg.png') no-repeat center center fixed;
    background-size: cover;
    opacity: 0.2;
}

/* * {
    outline: 1px solid red;
} */
</style>