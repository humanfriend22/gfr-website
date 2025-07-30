<template>
    <HeaderWrapper>
        <div class="min-h-screen">
            <Header title="Admin Panel">
                <HeaderLink to="/admin">
                    Home
                </HeaderLink>
                <HeaderLink to="/admin/files">
                    Files
                </HeaderLink>
                <HeaderLink to="/admin/users">
                    Users
                </HeaderLink>
                <HeaderLink to="/admin/teams">
                    Teams
                </HeaderLink>
                <HeaderLink to="/admin/events">
                    Events
                </HeaderLink>
                <HeaderLink to="/admin/blog">
                    Blog
                </HeaderLink>
            </Header>

            <!-- Content -->
            <div class="bg-[var(--primary-background-color)] w-full mx-auto min-h-screen overflow-y-scroll overflow-x-hidden sm:px-0 -mt-24 text-white">
                <Section root-class="lg:hidden" class="mx-10 mt-2">
                    <div>Woah, the admin panel can be dangerous. Let's do this on a computer.</div>
                </Section>
                <div class="hidden lg:block">
                    <slot />
                </div>
            </div>
            <Footer />
        </div>
    </HeaderWrapper>
</template>