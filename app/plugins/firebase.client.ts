import { initializeFirebase } from "~/composables/firebase";
import authMiddleware from "~/middleware/auth";

export default defineNuxtPlugin(async () => {
    await initializeFirebase();
    addRouteMiddleware("auth", authMiddleware, { global: true });
});
