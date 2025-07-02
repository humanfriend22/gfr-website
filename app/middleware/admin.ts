export default defineNuxtRouteMiddleware((to, from) => {
    if (!to.path.startsWith("/admin")) return navigateTo(to.path);

    if (!currentUser.value) {
        const params = new URLSearchParams({
            error: "unauthenticated (please log in)",
        });
        return navigateTo(`/?` + params.toString());
    }
});
