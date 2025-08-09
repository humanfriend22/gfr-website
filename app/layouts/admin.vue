<template>
    <PageContainer>
        <template #links>
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
            <HeaderLink to="/admin/blog">
                Blog
            </HeaderLink>
        </template>

        <Section root-class="lg:hidden" class="mx-10 mt-2">
            <div>Woah, the admin panel can be dangerous. Let's do this on a computer.</div>
        </Section>
        <div class="hidden lg:block">
            <slot />
        </div>
    </PageContainer>
</template>