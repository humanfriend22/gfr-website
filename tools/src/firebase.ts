import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";
process.env["FIRESTORE_EMULATOR_HOST"] = "127.0.0.1:8080";
process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = "127.0.0.1:9199";

const app = initializeApp({
    credential: cert("./firebase-admin.json"),
});
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
