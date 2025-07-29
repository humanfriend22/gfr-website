import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

export function initializeFirebase(emulators = true) {
    if (emulators) {
        process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";
        process.env["FIRESTORE_EMULATOR_HOST"] = "127.0.0.1:8090";
        process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = "127.0.0.1:9199";
    }

    const app = initializeApp({
        credential: cert("./firebase-admin.json"),
    });
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    const bucket = getStorage(app).bucket(
        "gs://gael-force-robotics-hf.firebasestorage.app",
    );

    return { app, auth, firestore, bucket };
}
