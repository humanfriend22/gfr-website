import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: [
        "@nuxt/image",
    ],
    vite: {
        plugins: [tailwindcss()],
    },
    image: {},
    css: ["@/assets/app.css"],
    runtimeConfig: {
        public: {
            gitCommit: process.env.GIT_COMMIT || "dev",
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
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNGZmYjFlYjllMGRlZTU5YWUwOWRjZjlhMGRmOGY4NmQyZTkxOWQ5OGI1YmIzOWJmMTM2ZDI2ZDE3MTc3NzdmZTIxNTdiODY1OTNiMTJkYjMiLCJpYXQiOjE3NzUyNDE5MDkuODE5Nzc2MSwibmJmIjoxNzc1MjQxOTA5LjgxOTc3NywiZXhwIjoyNzIyMDEzMTA5LjgxMTUzMDEsInN1YiI6IjY5MDMiLCJzY29wZXMiOltdfQ.rQcDbcu7A0ULZ0tq1vTAo4LwpmV5S3FVFW9g2XlyEsgRqlNVKDv67eUtyV-h9QHY7gu2VaIRsHdhmk4X5h1Kc2qfWrXes_x5ZF4SKZIEDCaPpFRMyYSicaqMp15di6_NyErnZFI7TbhQhOER9lQfvD4T0_SJnrnQ-7m4ZtiQ3boFWgAhVI04dPRAZqkMwOp4nj2oH29AVDYu6zLAADfdf0Kri91s2f1vfp5iR3qC74uNu-uj7XguNQvw-zk9begLkHD7epn2baYu2SvO-yC9s1SX5cJ5OtEnI89uTt_Z3Z93hsGy3dLDLH_5Ffoe8WwsSlEr7qcHWKFIQZ7SJG3c45ANTlcPeren-iSMIcCCKE3YmcsRHv2ZAJadBpbsZjwhyjSHJdLdJ1Uw5HJjXxJUluikejazioKyqFae109TpzVjuAA_yTHHB2rLhgA8IsZWqkL1vmL8S0yBGiPyo6DFBxaJri5-oik_kU7moju4thNgTV8rh1x704DCFTTHHjGo1lt3uJEBYamYKwBkhBKi9YLKf8A2_RVr3CEiCvakxby6sSlWpMD1Y4fLPyTbSeIy9b0853V6ihtu2Ue5nwFsulTFW81DkTRKusAyav5hsEHs7mFe4OB4qPNXymB6q98jgoYoP_M_9AScQzRapRJ7A2QmWwvZ5AdXHxgoJS4cR-Y",
        },
    },
    dir: {
        public: "public",
    },
});
