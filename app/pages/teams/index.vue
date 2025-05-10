<script setup lang="ts">


</script>

<template>
    <div class="flex justify-center items-center w-full h-full">
        <div class="h-full max-w-screen-xl grid grid-cols-2 gap-8 pb-10 w-full z-30">
            <div v-for="i in Array(4)" class="text-white w-full flex gap-7 justify-center items-center border-4 rounded-xl border-gray-600 hover:border-gray-400 cursor-pointer duration-500">
                <div class="grid grid-cols-2 gap-x-5">
                    <div class="w-fit">
                        <NuxtImg src="VLogo.png" width="200" height="200" />
                    </div>
                    <div class="w-full">
                        <p class="h1 font-bold text-5xl">5327V</p>
                        <p class="text-xl">Welcome to this team!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* * {
    outline: 1px solid red;
} */
</style>