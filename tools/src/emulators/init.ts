import { initializeFirebase } from "../firebase";
import { type UserRecord } from "firebase-admin/auth";
import {
    getRandomElementsFromArray,
    lenientCreateDocument,
    LETTERS,
    NAMES,
} from "./helpers";
import { readFile } from "fs/promises";

const { auth, firestore, bucket } = initializeFirebase();

// 1. Extract president and captain users & delete all other users
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

// 2. Create mock users & extract UIDs
let uids: any[] = [];
if ((await auth.listUsers()).users.length < 5) {
    let userCreationPromises: Promise<UserRecord>[] = [];

    for (const displayName of NAMES) {
        const email = displayName.toLowerCase().replaceAll(" ", "_") +
            "@example.com";
        userCreationPromises.push(auth.createUser({ displayName, email }));
    }

    uids = (await Promise.all(userCreationPromises)).map((user) => user.uid);
}

// 3. Create seasons & teams
async function createSeason(id: string, teams: number, reId: number) {
    const seasonDocument = firestore.collection("seasons").doc(id);
    if ((await seasonDocument.get()).exists) {
        console.log(`Season document ${id} already exists, skipping creation.`);
        return;
    }

    const officersUIDs = getRandomElementsFromArray(6, uids);
    const officers: SeasonOfficerMap = {
        president: googlePresidentUser || officersUIDs[0],
        vice_president: officersUIDs[1],
        secretary: officersUIDs[2],
        treasurer: officersUIDs[3],
        junior_pred: officersUIDs[4],
        senior_pred: officersUIDs[5],
    };

    await seasonDocument.create({
        reId,
        officers,
    });

    let teamPromises = [];
    const letters = getRandomElementsFromArray(teams, LETTERS);
    for (let i = 0; i < teams; i++) {
        const letter = letters[i];

        let captains = getRandomElementsFromArray(2, uids);
        if (i === 0 && googleCaptainUser) {
            // Ensure the first team has the Google captain
            captains = [googleCaptainUser, captains[1]];
            await auth.updateUser(googleCaptainUser, {
                displayName: "Current Season Captain",
            });
            await lenientCreateDocument(
                firestore.collection("users").doc(
                    googleCaptainUser,
                ),
                {
                    name: "Current Season Captain",
                    graduatingYear: 2027,
                    bio: "",
                },
            );
        }

        teamPromises.push(
            seasonDocument.collection("teams").doc(letter).create({
                name: "5327" + letter,
                reId: 0,
                captains,
                logo: "",
                members: getRandomElementsFromArray(10, uids),
                competitions: {},
                discord: "",
                instagram: "",
            }),
        );
    }

    await Promise.all(teamPromises);
}

async function createEvents(n: number) {
    const eventsCollection = firestore.collection("events");
    const existingEvents = await eventsCollection.get();
    if (!existingEvents.empty) {
        console.log("Events already exist, skipping creation.");
        return;
    }

    let eventPromises = [];
    for (let i = 0; i < n; i++) {
        const eventId = `event-${i + 1}`;
        const eventData = {
            title: `Event ${i + 1}`,
            description: `Description for Event ${i + 1}`,
            info: "SUPER LOGN INFO",
            start: new Date(Date.now() + i * 86400000), // 1 day apart
            end: new Date(Date.now() + (i + 1) * 86400000), // 1 day duration
            location: `Location ${i + 1}`,
            image: "/gfr-summer-newsletter.png",
            signup_link: "",
            volunteer_link: "",
        };
        eventPromises.push(
            eventsCollection.doc(eventId).set(eventData),
        );
    }

    await Promise.all(eventPromises);
}

async function createBlogs(n: number) {
    const blogsCollection = firestore.collection("blogs");
    const existingBlogs = await blogsCollection.get();
    if (!existingBlogs.empty) {
        console.log("Blogs already exist, skipping creation.");
        return;
    }

    let blogPromises = [];
    const summerNewsletterContent = await readFile(
        "./SummerNewsletter2024.mdx",
        "utf-8",
    );
    for (let i = 0; i < n; i++) {
        const blogId = `blog-${i + 1}`;
        const file = bucket.file(`blogs/${blogId}/content.md`);

        const [_, [url]] = await Promise.all([
            file.save(summerNewsletterContent),
            file.getSignedUrl({
                action: "read",
                expires: Date.now() + (1000 * 60 * 60 * 24 * 3), // or a timestamp like Date.now() + 1000 * 60 * 60
            }),
        ]);

        const blogData = {
            title: `Blog Post ${i + 1}`,
            author: "Moon Liu",
            description:
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor non felis ac imperdiet. Aliquam consequat, augue nec finibus lacinia, nibh est porta urna, sed suscipit turpis leo ut nunc libero.`,
            image: "/gfr-summer-newsletter.png",
            date: new Date(Date.now() + i * 86400000), // 1 day apart
            content: url,
        };
        blogPromises.push(
            blogsCollection.doc(blogId).set(blogData),
        );
    }

    await Promise.all(blogPromises);
}

await Promise.all([
    // createSeason("push-back-2526", 4),
    createSeason("high-stakes-2425", 5, 190),
    createEvents(2),
    createBlogs(2),
]);

// 4. Change their names (captain is done when their team is known)
if (googlePresidentUser) {
    await auth.updateUser(googlePresidentUser, {
        displayName: "Current Season President",
    });

    await lenientCreateDocument(
        firestore.collection("users").doc(googlePresidentUser),
        {
            name: "Current Season President",
            graduatingYear: 2027,
            bio: "",
        },
    );
}

// 5. Create site document
const siteDocument = firestore.collection("site").doc("site");
if ((await siteDocument.get()).exists) {
    console.log("Site document already exists, skipping creation.");
} else {
    await lenientCreateDocument(siteDocument, {
        homeImage: "/gfr-worlds-2023.jpeg",
        bannerMarkdown: "Welcome to the GFR Website",
        currentSeason: "high-stakes-2425",
        admins: [googlePresidentUser, googleCaptainUser],
        steps: Array(10).fill({
            title: "",
            markdown: "",
        }),
    });
}
