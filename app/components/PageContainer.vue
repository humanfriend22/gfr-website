<template>
    <div class="max-w-screen-xl h-body w-full mx-auto z-20 pt-24">
        <slot />
    </div>
</template>

<style>
.h-body {
    height: calc(100vh - 6rem);
}
</style>