/* An internal tool to resolve the assets for a static build.
1. Fetches current state of the assets from Firestore.
2. Fetches the assets from Firebase Storage. Abort on any error.
3. Replaces assets in the app/public/dynamic directory with new assets.
4. Replaces app.config.ts with new asset structure.
*/

import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const app = initializeApp({
    credential: cert("./firebase-admin.json"),
});
const firestore = getFirestore(app);
const storage = getStorage(app);

const bucket = storage.bucket(
    "gs://gael-force-robotics-hf.firebasestorage.app",
);

const files = (await bucket.getFiles())[0];
