import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: [
        "@nuxt/content",
        "@nuxt/image",
        "@nuxt/icon",
        "@nuxtjs/html-validator",
    ],
    vite: {
        plugins: [tailwindcss()],
    },
    image: {},
    css: ["@/assets/app.css"],
    runtimeConfig: {
        public: {
            // set NUXT_PUBLIC_FIREBASE_API_KEY environment variable
            firebase: {
                apiKey: "AIzaSyDFPQpKDLQt77aN4jtSDSGASQtLiqOl7Qk",
                authDomain: "gael-force-robotics-hf.firebaseapp.com",
                projectId: "gael-force-robotics-hf",
                storageBucket: "gael-force-robotics-hf.firebasestorage.app",
                messagingSenderId: "585677099356",
                appId: "1:585677099356:web:f682381cb210a4abcff199",
            },
            robotevents:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMWQzZDhkMjE1MDcyZWUzOWQwYjc5MWQxOTYwMmFjY2FjZjJmNjdiYzk2ZTU1ZDYxYjA1OWY1NDk2Yzc0NGE1M2QzYTliMmEzZTFlNzM4YmEiLCJpYXQiOjE3NTMwNTg0ODguMzQ1MzAyMSwibmJmIjoxNzUzMDU4NDg4LjM0NTMwNSwiZXhwIjoyNjk5NzQzMjg4LjMzNjE3NjksInN1YiI6IjEyODU4NSIsInNjb3BlcyI6W119.W2xUm-An3Zt2yMOvZCPN0rzvwhbgps5ckIZ4d5vhnc43bttkWejYYTIiZShgYcByUsJbX5Oe35qq1ODn7xgAkTRxjYUCQajkGKzMp6gaCX4mNRGwFA7XkNI1QNioTE7_DZzd7_RN9bzuUeQ2IGivs7oHeD2tcxmubXM8L_fqaRqsJpoO2lcr4xtgXWTGgndIhU7-NfIx1iXE397DzwClLd2z1kPUeXwXROUDZRLyulgJ8FU_1Ky77T4is6owzGoSmgBXQ_E8052w1zvCZcLXPYjOygug9xqmYpD0IIF7nZ-o8jZjaNQsziCo33I8FPp7ycWJu1O2cmtGm30Jydet2lGD88P6gRWmcwcrQ2XmIxwkWtISvslsDSRKv4-VeEJfSSwfCe15s9EFnYkFGzOq7ie0qINVEfbQGEk6Z8DDfXu7tA6yInKvKvtgCrVyAaEw8DWNqPQk5_aYNMm-MGljYsCubPBVDmHDnuP8RvPtD44Gjx_Vbel77HCPXEOZXXyPJKa64ERpoM8BExE1GzMkYz6Zf9obqIoh3StW9bNaRvo8ywSzr3OjExho5f3TjA2mAI9q0m7JTr7EWIbgAnkWd1ENFrIP3McFvTvK4W99uN8zSnMjoYlcQWcD3B_FRvvDpIfh5xHsFBYZYCjc2-rD8WNGUOu2-dFmB3fzmf-fssY",
        },
    },
    dir: {
        public: "public",
    },
});
