<template>
    <HeaderWrapper>
        <Header />
        <div class="bg-[#0d0d0d] min-w-screen-xl mx-auto min-h-screen overflow-x-hidden px-4 sm:px-0">
            <div class="min-h-screen lg:px-none mx-auto -mt-24 flex flex-col gap-16 pt-24 lg:pt-0">
                <section class="relative min-h-screen flex flex-col bg-[var(--primary-background-color)]">
                    <slot />
                </section>
            </div>
            <Footer />
        </div>
    </HeaderWrapper>
</template>