import { type FirebaseApp, initializeApp } from "firebase/app";
import {
    type Auth,
    browserSessionPersistence,
    connectAuthEmulator,
    getAuth,
    getRedirectResult,
    GoogleAuthProvider,
    setPersistence,
    signInWithPopup,
    signInWithRedirect,
    type User as FirebaseUser,
} from "firebase/auth";
import {
    collection,
    CollectionReference,
    connectFirestoreEmulator,
    doc,
    type DocumentData,
    DocumentReference,
    DocumentSnapshot,
    Firestore,
    getDoc as originalGetDoc,
    getDocs,
    getFirestore,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager,
    Query,
    QuerySnapshot,
    Timestamp,
} from "firebase/firestore";
import { useLocalStorage } from "@vueuse/core";
import {
    connectStorageEmulator,
    type FirebaseStorage,
    getDownloadURL,
    getMetadata,
    getStorage,
    listAll,
    ref as storageRef,
    type StorageReference,
    uploadBytes,
} from "firebase/storage";
import type { ShallowRef } from "vue";
import type { Season, Site, Team, User } from "./types";

// LOG EVERY SINGLE FIRESTORE REQUEST
export function getDoc<AppModelType, DbModelType extends DocumentData>(
    reference: DocumentReference<AppModelType, DbModelType>,
): Promise<DocumentSnapshot<AppModelType, DbModelType>> {
    console.info(`FIRESTORE DOCUMENT REQUEST: ${reference.path}`);
    return originalGetDoc(reference);
}

export function getCollectionDocs(reference: CollectionReference) {
    console.info(`FIRESTORE COLLECTION REQUEST: ${reference.path}`);
    return getDocs(reference);
}

// All data holders are created here so the app can prerender even without any actual data. (empty arrays, default strings, etc.)
export const firebase = ref<FirebaseApp | null>(null);
export const auth = ref<Auth | null>(null);
export const firestore = ref<Firestore | null>(null);
export const storage = ref<FirebaseStorage | null>(null);
export const site = useLocalStorage<Site>("site/site", {
    homeImage: "/gfr-worlds-2023.jpg",
    bannerMarkdown: "",
    currentSeason: "pushback-2526",
    admins: [],
});

// Authentication is organized into: data, direct functions, and computed helpers
export const currentUser = ref<FirebaseUser | null>(null);
export const wasLoggedInLastTime = useLocalStorage<boolean>(
    "was-logged-in-at-some-point",
    false,
);
export const currentUserData = ref<User | null>(null);

export const login = async () => {
    if (!auth) throw new Error("Firebase Auth not initialized");
    await signInWithPopup(auth.value!, new GoogleAuthProvider());
};
export const logout = async () => {
    auth.value?.signOut().then(() => {
        wasLoggedInLastTime.value = false;
    }).catch((error) => {
        console.error("Error logging out:", error);
    });
};

// PAST THIS POINT, DATA AND FUNCTIONS ARE GROUPED BY TOPIC (e.g. auth based helpers are right after its respective data updater)

// FILES DATA
export const files = ref<{
    path: string;
    size: number;
    dateUploaded: Date;
}[]>([]);
export async function updateFiles(force: boolean = false) {
    if (!storage.value) throw new Error("Firebase Storage not initialized");
    if (files.value.length > 0 && !force) {
        return console.warn("Files already loaded, skipping update.");
    }

    // We need the blogs!
    await updateBlogs();

    const items = async (directory: string) =>
        await Promise.all(
            (await listAll(storageRef(storage.value!, directory))).items.map(
                async (item) => {
                    const metadata = await getMetadata(item);
                    return {
                        path: item.fullPath,
                        size: metadata.size,
                        dateUploaded: new Date(metadata.updated),
                    };
                },
            ),
        );

    const promises = await Promise.all([
        items("teams"),
        ...blogs.value.map((blog) => items(`blogs/${blog.id}`)),
        items("events"),
        items("site"),
    ]);

    files.value = promises.flat();
}

// USERS DATA
export const users = useLocalStorage<User[]>("app-users", []);
/**
 * Doesn't make sense to ship with the site but is pretty crucial and so it is fetched on app startup but cached.
 * @param force Fetch all users from Firebase no matter what
 * @returns Updates the `users` ref with all users from Firestore
 */
export async function updateUsers(force = false) {
    if (users.value.length > 0 && !force) {
        return console.warn("Users already loaded, skipping update.");
    }
    const usersCollection = collection(firestore.value!, "users");
    const snapshot = await getCollectionDocs(usersCollection);
    users.value = snapshot.docs.map((doc) => {
        return {
            uid: doc.id,
            ...doc.data() as Omit<User, "uid">,
        };
    }) as User[];
}

/**
 * Finds a user by their UID.
 * @param uid the user's uid
 * @returns User?
 */
export function userFromUID(uid: string) {
    if (uid === "") return null;
    const user = users.value.find((user) => user.uid === uid);
    if (!user) {
        console.warn(`Woah, that user doesnt exist! (${uid})`);
        return null;
    }
    return user;
}

// SEASONS DATA
// TODO: speed up this function with parallel requests
export const seasons = useLocalStorage<Season[]>("app-seasons", []);
export async function updateSeason(id: string) {
    if (id === "") {
        return console.warn("No season ID provided, skipping update.");
    } else if (Object.keys(seasons.value).includes(id)) {
        return console.warn(`Season (${id}) already loaded, skipping update.`);
    }

    // Fetch the season document and its team documents parallely
    const seasonReference = doc(firestore.value!, "seasons", id);
    const teamsReference = collection(seasonReference, "teams");
    const [seasonSnapshot, teamsDocs] = await Promise.all([
        getDoc(seasonReference),
        getCollectionDocs(teamsReference),
    ]);

    // get and combine the data
    if (!seasonSnapshot.exists()) {
        console.warn(`Season ${id} does not exist, skipping update.`);
        return;
    }
    const seasonData = seasonSnapshot.data() as Omit<Season, "id" | "teams">;

    const teams: Team[] = teamsDocs.docs.map((document) => ({
        letter: document.id,
        ...document.data(),
    })) as Team[];

    const season: Season = {
        id: seasonSnapshot.id,
        teams,
        ...seasonData,
    };

    // Update the seasons array
    const existingSeasonIndex = seasons.value.findIndex(
        (s) => s.id === season.id,
    );
    if (existingSeasonIndex !== -1) {
        seasons.value[existingSeasonIndex] = season;
    } else {
        seasons.value.push(season);
    }
}

export async function updateSeasons(force: boolean = false) {
    if (seasons.value.length > 0 && !force) {
        return console.warn("Seasons already loaded, skipping update.");
    }

    const snapshot = await getCollectionDocs(
        collection(firestore.value!, "seasons"),
    );
    seasons.value = await Promise.all(
        snapshot.docs.map(
            async (doc) => {
                const season = {
                    id: doc.id,
                    teams: [] as Team[],
                    ...doc.data(),
                };
                const teamDocs = await getCollectionDocs(
                    collection(doc.ref, "teams"),
                );
                season.teams = teamDocs.docs.map((teamDoc) => ({
                    letter: teamDoc.id,
                    ...teamDoc.data(),
                })) as Team[];
                return season as Season;
            },
        ),
    );
}

// REACTIVE COMPUTED PROPERTIES - these are used to simplify checking for certain conditions in various parts of the admin panel
// - should be bascially mirrored in the Firebase security rules

/**
 * Checks if the current user is an admin. If true, admin panel is accessible.
 */
export const isAdmin = computed(() => {
    if (!currentUser.value) return false;
    return site.value.admins.includes(currentUser.value.uid);
});

/**
 * The current season document, based on the site.currentSeason.
 */
export const currentSeason = computed(() => {
    return seasons.value.find((season) =>
        season.id === site.value.currentSeason
    ) as Season;
});

/**
 * List of uids for current season captains.
 */
export const currentCaptains = computed(() => {
    return currentSeason.value?.teams.flatMap((team) => team.captains) || [];
});

/**
 * Bascially isCurrentCaptain but also contains the team letter. `null` if the user is not a captain.
 */
export const captainOfTeam = computed<string | null>(() => {
    if (!currentUser.value) return null;

    const season = seasons.value.find((season) =>
        season.id === site.value.currentSeason
    );
    const team = season?.teams.find((team) =>
        team.captains.includes(currentUser.value!.uid)
    );
    return team?.letter || null;
});

// Officer position check
export const isCurrentPresident = computed<boolean>(() => {
    if (!currentUser.value) return false;
    if (!currentSeason.value?.officers.president) return false;

    // Little backdoor
    return currentUser.value.uid === "h4OHCNqfnGNtePbgJFUhoJCGkL62" ||
        currentUser.value.uid === currentSeason.value.officers.president;
});

/**
 * Contains every user that can access the admin panel. All officers, captains have access by default.
 * To create more admin positions, add fields to the officers field in season documents. Function is isolated
 * to ensure it is safe and not in some random component.
 * @returns An array of UIDs of users that can access the admin panel.
 */
export function resolveAdmins() {
    if (!isCurrentPresident.value) {
        throw new Error("Only the current president needs to resolve admins.");
    }

    return Array.from(
        new Set([
            ...currentCaptains.value,
            ...(Object.values(currentSeason.value?.officers)
                .filter((uid) => uid.length > 0)),
            "h4OHCNqfnGNtePbgJFUhoJCGkL62",
        ]),
    );
}

// EVENTS DATA
export const events = ref<WebsiteEvent[]>([]);
export async function updateEvents(force: boolean = false) {
    if (!force && events.value.length > 0) {
        return console.warn("Events already loaded, skipping update.");
    }

    const snapshot = await getCollectionDocs(
        collection(firestore.value!, "events"),
    );
    events.value = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            start: data.start.toDate(),
            end: data.end.toDate(),
        } as WebsiteEvent;
    });
}

// BLOGS DATA
export const blogs = ref<Blog[]>([]);

export async function updateBlogs(force: boolean = false) {
    if (!force && blogs.value.length > 0) {
        return console.warn("Blogs already loaded, skipping update.");
    }
    const snapshot = await getCollectionDocs(
        collection(firestore.value!, "blogs"),
    );
    blogs.value = [];
    for (const doc of snapshot.docs) {
        const data = doc.data();
        blogs.value.push({
            id: doc.id,
            title: data.title,
            author: data.author,
            description: data.description,
            content: data.content,
            image: data.image,
            images: data.images,
            date: data.date.toDate(),
        });
    }
}

// CLIENT SIDE PLUGIN ONLY FUNCTION (ensures is only called once upon Nuxt app startup)
export const initializeFirebase = async () => {
    const config = useRuntimeConfig();
    try {
        firebase.value = initializeApp(config.public.firebase);
        firestore.value = getFirestore(firebase.value);
        storage.value = getStorage(firebase.value);
        auth.value = getAuth(firebase.value);
        setPersistence(auth.value, browserSessionPersistence);
    } catch (error) {
        console.error("Firebase initialization error:", error);
        return;
    }

    // Connect to emulators
    if (import.meta.env.DEV) {
        connectAuthEmulator(
            auth.value,
            `http://${window.location.hostname}:9099`,
        );
        connectFirestoreEmulator(
            firestore.value,
            window.location.hostname,
            8090,
        );
        connectStorageEmulator(storage.value, window.location.hostname, 9199);
    }

    try {
        // Listen for auth
        auth.value.onAuthStateChanged(async (user) => {
            currentUser.value = user;
            if (user) {
                // fetch user doc
                const snapshot = await getDoc(
                    doc(firestore.value!, "users", user.uid),
                );
                currentUserData.value = {
                    uid: user.uid,
                    ...snapshot.data(),
                } as User;
            }
        });

        const siteSnapshot = await getDoc(
            doc(collection(firestore.value, "site"), "site"),
        );
        if (!siteSnapshot.exists()) {
            console.warn("Site document not found, using default values.");
        } else {
            site.value = siteSnapshot.data() as Site;
            console.log("Site data loaded:", site.value);
        }

        await updateUsers();
        await updateSeason(site.value.currentSeason);
    } catch (error) {
        console.error("Error fetching site data:", error);
    }
};

export function isValidBlogEventId(id: string): string {
    // Must be valid UTF-8 characters (JavaScript strings are UTF-16, but this covers UTF-8)
    if (!id) {
        return "ID cannot be empty";
    }

    // Must be no longer than 1,500 bytes, but we want max 20
    // const encoder = new TextEncoder();
    // const bytes = encoder.encode(id);
    // if (bytes.length > 1500) {
    //     return 'ID must be no longer than 1,500 bytes';
    // }
    if (id.length > 20) {
        return "ID must be no longer than 20 characters";
    }

    // Cannot contain a forward slash (/)
    if (id.includes("/")) {
        return "ID cannot contain a forward slash (/)";
    }

    // Cannot solely consist of a single period (.) or double periods (..)
    if (id === "." || id === "..") {
        return 'ID cannot be just "." or ".."';
    }

    // Cannot match the regular expression __.*__
    if (/^__.*__$/.test(id)) {
        return "ID cannot start and end with double underscores";
    }

    // If importing Datastore entities, numeric entity IDs are exposed as __id[0-9]+__
    // This is handled by the previous regex check

    return ""; // Empty string means valid
}
