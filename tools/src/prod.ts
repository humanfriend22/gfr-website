import { initializeFirebase } from "./firebase";

const { auth, firestore } = initializeFirebase(false);

// Wipe all users
const { users } = await auth.listUsers();
await auth.deleteUsers(users.map((user) => user.uid));

// Initialize Firestore
const siteDoc = firestore.collection("site").doc("site");
await siteDoc.set({
    currentSeason: "high-stakes-2425",
    bannerMarkdown: "Welcome to the Gael Force Robotics website!",
    bannerImage: "/gfr-worlds-2023.jpg",
    admins: [],
});
