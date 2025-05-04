<script setup lang="ts">
import { initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

const runtimeConfig = useRuntimeConfig();
const app = initializeApp(runtimeConfig.public.firebase);
const auth = getAuth(app);
const firestore = getFirestore();

inject<Auth>('firebase-auth', auth);
</script>

<template>
    <NuxtLayout>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>

<style>
html,
body {
    background-color: #0d0d0d;
}

/* SIZING DEBUG */
/* * {
    outline: 1px solid red;
} */
</style>