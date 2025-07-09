export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server || !to.path.startsWith("/admin")) return;

    if (!currentUser.value && to.path.startsWith("/admin")) {
        const params = new URLSearchParams({
            error: "unauthenticated (please log in)",
        });
        return navigateTo(`/?` + params.toString());
    }
});
