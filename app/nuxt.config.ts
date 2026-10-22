import { defineNuxtConfig } from 'nuxt/config'
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
            FIREBASE_EMULATOR_PROD: process.env.FIREBASE_EMULATOR_PROD === "true",
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
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZDMyZWJlODUzOWU1YjJlZWM4NTNhNjcyMGUxZWI5NDY5YTFjMGEzODUzNmQzZTA5ODI5M2E3YjgzZTY1ODU3M2Y5ZjUzNmNmMDljNGVmMDAiLCJpYXQiOjE3OTI2ODM3MzguODA4Nzk0LCJuYmYiOjE3OTI2ODM3MzguODA4Nzk1OSwiZXhwIjoyNzM5NDU0OTM4LjgwMzI5Nywic3ViIjoiMTI4NTg1Iiwic2NvcGVzIjpbXX0.D1FHPuXzJV5erCG2dW_zpqQTo2H_9CPYQuUHB3yryWtVtwMWFg_3gECBpmBNp6MvqGSSzBFlGr-LAY2LbPb3Z2sYpWdMxz-VEi2HtMMLulr4gcEYZEfLAeyiDv1jnFBPWEt3-mbUWa1Ll1CLRIQJ2mvCOuyqiPZI-GmYbGMN2c1H84Pwz-d-rD0Xfbontq36ihz7hPW9fjT0rUpaV_x4shkg2AXoMwFCMyKGGUWtpd1QNmR4nzdDMRFJA1fDcAHdGcnOBzWhZsQAAxo8I1EXSaqn7wPldVF-wcr6uleSmh5UhyNnuVtMQEf85qMYd9oGwvLNvofjdkJ2bIWXBjN6088A4VZm-0Glk2CU2TaDCTt-2QwWFn3uFOvIkKA6ZzECntwgeugciyl01Va2-KdudWo4D2YLYBUy52Wncq70hwzfdVhvzR260tov89A4qHC2JB-_TmizXlOZX9R2xVrcRMPRESorZVXDgtOigUezTtjW5ry_j5webR4EMqCBD1aloMpsc8Vo50dvOlin8JAb4h6SL22Lk1SnxgQu1H8pMrKjcHIID1Z_jdsL0oegjf2zDzLO_fKS1YKlj44HiKGRQQebW7t0Md5rnej3xtqRvUJVFBo5Cqrhm2Rh9rjMbE5ZtbGfCvkC3Radg66nk_GTRJPafWyyImPrF6-dKQJTHz8",
                roboteventsDomain: "events.vex.com",
      },
    },
    dir: {
        public: "public",
    },
});
