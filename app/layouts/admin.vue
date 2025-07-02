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
                <HeaderLink to="/admin" disabled>
                    Events
                </HeaderLink>
                <HeaderLink to="/admin" disabled>
                    Blog
                </HeaderLink>
            </Header>

            <!-- Content -->
            <div class="bg-[var(--primary-background-color)] w-full mx-auto min-h-screen overflow-y-scroll overflow-x-hidden sm:px-0 -mt-24 text-white">
                <div class="lg:hidden">Woah, the admin panel is a dangerous place. Let's do this on a computer.</div>
                <ClientOnly>
                    <slot class="hidden lg:block" />
                </ClientOnly>
            </div>
            <Footer />
        </div>
    </HeaderWrapper>
</template>