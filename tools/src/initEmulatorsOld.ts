// @ts-nocheck
console.log("This script is for legacy only");
process.exit(0);

import { cert, initializeApp } from "firebase-admin/app";
import { getAuth, UserRecord } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { names } from "./names";

// Initialize Firebase
process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";
process.env["FIRESTORE_EMULATOR_HOST"] = "127.0.0.1:8080";
const app = initializeApp({
    credential: cert("./firebase-admin.json"),
});
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Delete all users except those with Google sign-in
let existingUsers = (await auth.listUsers()).users;
const googleUsers: string[] = existingUsers.filter((user) =>
    user.providerData[0]?.providerId === "google.com"
).map((user) => user.uid);

await auth.deleteUsers(
    existingUsers.map((user) => user.uid).filter((uid) =>
        !googleUsers.includes(uid)
    ),
);

const [googlePresidentUser, googleCaptainUser] = googleUsers;
if (googlePresidentUser) {
    await auth.updateUser(googlePresidentUser, {
        displayName: "Current Season President",
    });
    await firestore.collection("users").doc(googlePresidentUser).create({
        isAdmin: true,
        name: "Current Season President",
    });
}
if (googleCaptainUser) {
}

// Create users
let uids: any[] = [];
if ((await auth.listUsers()).users.length < 5) {
    let userCreationPromises: Promise<UserRecord>[] = [];

    for (const displayName of names) {
        const email = displayName.toLowerCase().replaceAll(" ", "_") +
            "@example.com";
        userCreationPromises.push(auth.createUser({ displayName, email }));
    }

    uids = (await Promise.all(userCreationPromises)).map((user) => user.uid);
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
function getRandomElements(n: number, array: any[]): any[] {
    return Array.from({ length: array.length }, (_, i) => i)
        .sort(
            () => Math.random() - 0.5,
        ).slice(0, n).map((index) => array[index]);
}

async function createSeason(id: string, teams: number) {
    const seasonDocument = firestore.collection("seasons").doc(id);
    if ((await seasonDocument.get()).exists) {
        console.log(`Season document ${id} already exists, skipping creation.`);
        return;
    }

    const officersUIDs = getRandomElements(6, uids);
    const officers: SeasonOfficerMap = {
        president: googlePresidentUser || officersUIDs[0],
        vice_president: officersUIDs[1],
        secretary: officersUIDs[2],
        treasurer: officersUIDs[3],
        junior_pred: officersUIDs[4],
        senior_pred: officersUIDs[5],
    };

    await seasonDocument.create({
        officers,
    });

    let teamPromises = [];
    const letters = getRandomElements(teams, LETTERS);
    for (let i = 0; i < teams; i++) {
        const letter = letters[i];

        let captains = getRandomElements(2, uids);
        if (i === 0 && googleCaptainUser) {
            // Ensure the first team has the Google captain
            captains = [googleCaptainUser, captains[1]];
            await auth.updateUser(googleCaptainUser, {
                displayName: "Current Season Captain",
            });
            await firestore.collection("users").doc(googleCaptainUser).create({
                isAdmin: true,
                name: "Current Season Captain",
                team: letter,
            });
        }

        teamPromises.push(
            seasonDocument.collection("teams").doc(letter).create({
                name: "5327" + letter,
                logo: "5327" + letter + ".png",
                reId: "",
                captains,
                members: getRandomElements(10, uids),
                competitions: {},
            }),
        );
    }

    await Promise.all(teamPromises);
}

await Promise.all([
    // createSeason("push-back-2526", 4),
    createSeason("high-stakes-2425", 5),
]);

// Create site document
const siteDocument = firestore.collection("site").doc("site");
if ((await siteDocument.get()).exists) {
    console.log("Site document already exists, skipping creation.");
} else {
    await siteDocument.create({
        homeImage: "",
        bannerHTML: "<span>Welcome to the GFR Website</span>",
        currentSeason: "high-stakes-2425",
    });
}
