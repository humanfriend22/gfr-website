import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: ["@nuxt/content", "@nuxt/image", "@nuxt/icon"],
    vite: {
        plugins: [tailwindcss()],
    },
    image: {},
    css: ["@/assets/app.css"],
    runtimeConfig: {
        public: {
            firebase: {
                apiKey: "",
                authDomain: "gael-force-robotics-hf.firebaseapp.com",
                projectId: "gael-force-robotics-hf",
                storageBucket: "gael-force-robotics-hf.firebasestorage.app",
                messagingSenderId: "",
                appId: "",
            },
        },
    },
});
