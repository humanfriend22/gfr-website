<template>
    <HeaderWrapper>
        <Header>
            Gael Force Robotics
        </Header>

        <div class="bg-[var(--primary-background-color)] w-full pb-2 mx-auto h-full overflow-x-hidden sm:px-0 -mt-24 text-white">
            <slot />
        </div>
        <Footer />
    </HeaderWrapper>
</template>