export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server || !to.path.startsWith("/admin")) return;

    if (
        (!currentUser.value ||
            !site.value.admins.includes(currentUser.value.uid)) &&
        to.path.startsWith("/admin")
    ) {
        const params = new URLSearchParams({
            error: "unauthorized",
        });
        return navigateTo(`/?` + params.toString());
    }
});
