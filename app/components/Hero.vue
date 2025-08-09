<template>
    <div class="grid lg:grid-cols-2 gap-2 items-center justify-center h-full w-full z-10 px-[1.25rem] md:px-[3rem]">
        <div class="flex w-full flex-col">
            <h1 class="mb-6 max-w-5xl text-5xl sm:text-6xl md:text-7xl xl:text-7xl font-semibold leading-none tracking-tight text-primary text-balance ">
                <slot name="title"></slot>
            </h1>
            <p class="mb-6 max-w-2xl text-sm font-light text-gray-400 text-balance sm:text-lg md:text-lg lg:mb-8 lg:text-lg xl:text-xl 2xl:text-2xl">
                <slot name="text"></slot>
            </p>
        </div>
        <div class="items-center justify-center block lg:flex">
            <slot />
        </div>
    </div>
</template>