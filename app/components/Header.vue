<template>
    <div class="flex items-center lg:justify-center h-24 w-full max-w-screen-xl mx-auto sticky top-0 left-0 z-30 text-primary bg-gradient-to-b from-black/80 to-black/1 px-3">
        <NuxtLink to="/" class="flex items-center gap-5 text-lg font-extrabold tracking-wide sm:text-lg">
            <NuxtImg src="gfr.png" width="50" height="50" class="inline" />
            <h1 class="gfr-gradient bg-clip-text text-transparent bg-gradient-to-r">
                {{ $route.meta.layout === 'admin' ? 'Admin Panel' : 'Gael Force Robotics' }}
            </h1>
        </NuxtLink>

        <!-- Desktop -->
        <div id="links" class="ml-auto items-center justify-end hidden lg:flex gap-8">

            <ClientOnly>
                <slot></slot>
            </ClientOnly>
        </div>

        <!-- Mobile -->
        <label id="drawer-button" for="mobile-links-drawer" aria-label="open sidebar" class="btn btn-square ml-auto lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-6 w-6 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </label>
    </div>
</template>