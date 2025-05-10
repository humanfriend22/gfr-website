<template>
    <HeaderWrapper>
        <Header />
        <div class="bg-[var(--primary-background-color)] max-w-screen-xl px-10 pt-24 pb-2 mx-auto h-full overflow-x-hidden sm:px-0 -mt-24 text-white">
            <slot />
        </div>
        <Footer />
    </HeaderWrapper>
</template>