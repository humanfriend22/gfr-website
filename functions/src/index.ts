/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions/v1";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

initializeApp();

export const createUserDocument = functions.auth.user().onCreate(
    async (user) => {
        const firestore = getFirestore();

        const userRef = firestore.collection("users").doc(user.uid);

        await userRef.create({
            name: user.displayName,
            email: user.email,
            graduatingYear: 2027,
            bio: "",
        });
    },
);
