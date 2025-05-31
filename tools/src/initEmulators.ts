import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { mock } from "node:test";
import { exit } from "process";

process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";
const app = initializeApp({
    credential: cert("./firebase-admin.json"),
});
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Users
const existingUsers = await auth.listUsers(1000);
await auth.deleteUsers(existingUsers.users.map((user) => user.uid));

const mockListNames = [
    "Sahith",
    "Arpit",
    "Aiden Wa.",
    "Kaushik",
    "Aarav K.",
    "Arjun C.",
    "Kimson",
    "Shane",
    "Kaito",
    "Aditya S.",
    "Ishaan",
    "Laksh",
    "Austin",
    "Amir",
    "Ayush R.",
    "Arjun S.",
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
    "Jayden P.",
    "Sohail",
    "Rithika",
    "Stephanie",
    "Prianka",
    "David Loo",
    "Rishi S.",
    "Eric",
    "Haziq",
    "Aarav G.",
    "Rucha",
    "Jayden M.",
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
    "Aarav S.",
    "Sean",
    "Anirudh Ram",
    "Aiden Wo.",
    "Nayanika",
    "Advaith",
    "Krishay",
    "Moon",
    "Samarth",
    "Rishi T.",
    "Aadit",
    "Jack",
    "Tanisha",
    "Courtney",
    "Nikhilesh",
    "Sora",
    "Hari",
    "Aaditya P.",
    "Krishiv",
    "David Lin",
    "Anup",
    "Kinson",
    "Aiden Ng.",
];

await Promise.all(
    mockListNames.map((name) =>
        auth.createUser({
            displayName: name,
            email: name.toLowerCase().replaceAll(" ", "_").replaceAll(
                ".",
                "_",
            ) +
                Math.random() +
                "@example.com",
        })
    ),
);
