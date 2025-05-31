<template>
    <div class="lg:flex items-center justify-center opacity-0 h-full px-6 z-30" style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px); opacity: 1;">
        <div class="flex w-full flex-col lg:w-1/2">
            <h1 class="mb-6 max-w-5xl text-5xl font-semibold leading-none tracking-tight text-primary text-balance sm:text-7xl md:text-8xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                <slot name="title"></slot>
            </h1>
            <p class="mb-6 max-w-2xl text-sm font-light text-gray-400 text-balance sm:text-lg md:text-lg lg:mb-8 lg:text-lg xl:text-xl 2xl:text-2xl">
                <slot name="text"></slot>
            </p>
        </div>
        <div class="lg:w-1/2 items-center justify-center block lg:flex">
            <slot />
        </div>
    </div>
</template>