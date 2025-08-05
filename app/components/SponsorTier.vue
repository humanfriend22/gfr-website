<template>
    <div class="flex flex-col justify-center items-center transition-colors group rounded-box border-4 select-none border-base-200/90 hover:border-[var(--gfr-blue)] duration-400 p-4"
        v-for="i in Array(3)">
        <Trophy class="w-12 h-12 text-amber-600 mb-4" />
        <h3 class="text-xl font-bold text-amber-600 mb-2">Bronze</h3>
        <p class="text-gray-300 text-md mb-4">$500 - $999</p>
        <div class="text-sm text-gray-400 text-center">
            <div class="flex flex-row justify-center items-center gap-1" v-for="i in 5">
                <Check class="w-6" /> Logo on website
            </div>
        </div>
    </div>
</template>