<template>
    <Section>
        <div class="flex flex-col justify-center items-center gap-y-5 px-4 h-fit">
            <div class="text-5xl font-bold mt-10">Read our <span class="gfr-gradient">Blog</span></div>
            <div class="text-center text-gray-500 text-lg">
                <p>Learn more about our club and get monthly insights into our Competition Teams!</p>
            </div>
            <Divider />

            <div class="hidden lg:flex flex-col w-full events-desktop h-fit">
                <BlogPreviewCardDesktop first id="test" />
                <BlogPreviewCardDesktop left />
                <BlogPreviewCardDesktop />
            </div>

            <div>
                <BlogPreviewCardMobile first />
                <BlogPreviewCardMobile v-for="i in Array(9)" />
            </div>

        </div>
    </Section>
</template>