import { initializeFirebase } from "~/composables/firebase";

export default defineNuxtPlugin(async (nuxtApp) => {
    initializeFirebase();
});
