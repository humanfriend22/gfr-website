import { cert, initializeApp } from "firebase-admin/app";
import { getAuth, UserRecord } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { mock } from "node:test";
import { exit } from "node:process";

process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";
process.env["FIRESTORE_EMULATOR_HOST"] = "127.0.0.1:8080";
const app = initializeApp({
    credential: cert("./firebase-admin.json"),
});
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Users
let existingUsers = (await auth.listUsers()).users;
const googleUsers: string[] = existingUsers.filter((user) =>
    user.providerData[0]?.providerId === "google.com"
).map((user) => user.uid);
await auth.deleteUsers(
    existingUsers.map((user) => user.uid).filter((uid) =>
        !googleUsers.includes(uid)
    ),
);
const googleAdminUser = googleUsers[0];

const names = [
    "Sahith",
    "Arpit",
    "Aiden Wa",
    "Kaushik",
    "Aarav K",
    "Arjun C",
    "Kimson",
    "Shane",
    "Kaito",
    "Aditya S",
    "Ishaan",
    "Laksh",
    "Austin",
    "Amir",
    "Ayush R",
    "Arjun S",
    "Shikhar",
    "Arnav",
    "Anirudha",
    "Rohith",
    "William",
    "Chittresh",
    "Amato",
    "Sonia",
    "Nathan",
    "Kavya",
    "Lukas",
    "Jayden P",
    "Sohail",
    "Rithika",
    "Stephanie",
    "Prianka",
    "David Loo",
    "Rishi S",
    "Eric",
    "Haziq",
    "Aarav G",
    "Rucha",
    "Jayden M",
    "Saketh Chakravadhanula",
    "Connor",
    "Aadrika",
    "Phoebe",
    "Ansh",
    "Easton",
    "Abhiram",
    "Sammy",
    "Medha",
    "Shrinidhi",
    "Nirupa",
    "Jay",
    "Ruhaan",
    "Nikash",
    "Daxton",
    "Jash",
    "Aarav S",
    "Sean",
    "Anirudh Ram",
    "Aiden Wo",
    "Nayanika",
    "Advaith",
    "Krishay",
    "Moon",
    "Samarth",
    "Rishi T",
    "Aadit",
    "Jack",
    "Tanisha",
    "Courtney",
    "Nikhilesh",
    "Sora",
    "Hari",
    "Aaditya P",
    "Krishiv",
    "David Lin",
    "Anup",
    "Kinson",
    "Aiden Ng",
];

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

// Create site document
const siteDocument = firestore.collection("site").doc("site");
if ((await siteDocument.get()).exists) {
    console.log("Site document already exists, skipping creation.");
} else {
    await siteDocument.create({
        homeImage: "",
        bannerHTML: "<span>Welcome to the GFR Website</span>",
        currentSeason: "push-back-2526",
    });
}

// Create seasons & teams
interface Team {
    letter: string;
    // Full name (not shorthand)
    name: string;
    // Logo filename in Firebase Storage
    logo: string;
    // RobotEvents Team ID
    reId: string;
    // Captains' UIDs
    captains: string[];
    // Team members' UIDs
    members: string[];
    // Competitions (propagated by Firebase Functions when reId changes)
    competitions: {
        [competitionId: string]: {
            name: string;
            date: string;
            location: string;
            awards: string[];
        };
    };
}

// UIDs
interface SeasonOfficerMap {
    president: string;
    vice_president: string;
    secretary: string;
    treasurer: string;
    junior_pred: string;
    senior_pred: string;
}

// Name + years is the document ID (e.g high-stakes-2425)
interface Season {
    officers: SeasonOfficerMap;
    teams: Team[];
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
        president: googleAdminUser || officersUIDs[0],
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

        teamPromises.push(
            seasonDocument.collection("teams").doc(letter).create({
                name: "5327" + letter,
                logo: "5327" + letter + ".png",
                reId: "",
                captains: getRandomElements(2, uids),
                members: getRandomElements(10, uids),
                competitions: {},
            }),
        );
    }

    await Promise.all(teamPromises);
}

await createSeason("push-back-2526", 4);
await createSeason("high-stakes-2425", 5);
