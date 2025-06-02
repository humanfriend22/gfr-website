<template>

    <HeaderWrapper>
        <div class="min-h-screen">
            <Header>
                Gael Force Robotics
            </Header>


            <!-- Content -->
            <div class="bg-[var(--primary-background-color)] w-full pb-2 mx-auto h-screen overflow-x-hidden sm:px-0 -mt-24 text-white">
                <slot />
            </div>



            <Footer />

        </div>

    </HeaderWrapper>
</template>