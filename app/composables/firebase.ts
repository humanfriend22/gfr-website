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
    connectFirestoreEmulator,
    doc,
    Firestore,
    getDoc,
    getDocs,
    getFirestore,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager,
} from "firebase/firestore";
import { useLocalStorage } from "@vueuse/core";
import {
    type FirebaseStorage,
    getDownloadURL,
    getMetadata,
    getStorage,
    listAll,
    ref as storageRef,
    type StorageReference,
} from "firebase/storage";

// Every user has write access to their own document -> Permissions and roles are stored in primary site document.
// Profile picture is stored in Firebase Storage in users/{uid}.jpg, fallback is Google profile picture.
export interface User {
    // Document ID
    uid: string;
    name: string;
    // In case they use a different email than their Google account
    email: string;
    team: string;
    graduatingYear: number;
}

interface Site {
    // Main image in Hero on homepage
    homeImage: string;
    // HTML for the banner on the homepage, empty to disable
    bannerHTML: string;
    // document ID (e.g. high-stakes-2425)
    currentSeason: string;
}

export interface Team {
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
export interface SeasonOfficerMap {
    president: string;
    vice_president: string;
    secretary: string;
    treasurer: string;
    junior_pred: string;
    senior_pred: string;
}

// Name + years is the document ID (e.g high-stakes-2425)
export interface Season {
    id: string; // Document ID
    officers: SeasonOfficerMap;
    teams: Team[];
}

interface Database {
    site: [Site];
    users: User[];
    seasons: Season[];
}

// All data holders are created here so the app can prerender even without any actual data. (empty arrays, default strings, etc.)
export const firebase = ref<FirebaseApp | null>(null);
export const auth = ref<Auth | null>(null);
export const firestore = ref<Firestore | null>(null);
export const storage = ref<FirebaseStorage | null>(null);

/// DATA

// Needed everytime
export const currentUser = ref<FirebaseUser | null>(null);
export const currentUserData = useLocalStorage<User | null>(
    "current-user-data",
    null,
);
export const siteData = useLocalStorage<Site>("site-data", {
    homeImage: "",
    bannerHTML: "",
    currentSeason: "",
});

export const login = async () => {
    if (!auth) {
        throw new Error("Firebase Auth not initialized");
    }
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth.value!, provider);
};

export const logout = async () => await auth.value?.signOut();

// TODO Use pagination
export const files = ref<{
    [name: string]: {
        path: string;
        uploaded: Date;
        url: string;
    };
}>({});
export const updateFiles = async () => {
    if (!storage.value) {
        throw new Error("Firebase Storage not initialized");
    }
    const listRef = storageRef(storage.value!, "teams");
    const result = await listAll(listRef);
    await Promise.all(
        result.items.map((item) => {
            return new Promise(async (resolve) => {
                files.value[item.name] = {
                    path: item.fullPath,
                    uploaded: new Date((await getMetadata(item)).updated),
                    url: await getDownloadURL(item),
                };
            });
        }),
    );
};

export const users = ref<User[]>([]);
export async function updateUsers() {
    if (users.value.length === 0) {
        const snapshot = await getDocs(collection(firestore.value!, "users"));
        users.value = snapshot.docs.map((doc) => ({
            uid: doc.id,
            ...doc.data() as Omit<User, "uid">,
        })) as User[];
    }
}
export function userFromUID(uid: string) {
    return users.value.find((user) => user.uid === uid);
}

// TODO: speed up this function with parallel requests
export const seasons = ref<Season[]>([]);
export async function updateSeasons() {
    if (seasons.value.length === 0) {
        const snapshot = await getDocs(collection(firestore.value!, "seasons"));
        for (const doc of snapshot.docs) {
            const season = {
                id: doc.id,
                teams: [] as Team[],
                ...doc.data(),
            };
            const teamDocs = await getDocs(collection(doc.ref, "teams"));
            season.teams = teamDocs.docs.map((teamDoc) => ({
                letter: teamDoc.id,
                ...teamDoc.data(),
            })) as Team[];
            seasons.value.push(season as Season);
        }
    }
}

// CLIENT SIDE PLUGIN ONLY FUNCTION (ensures is only called once upon Nuxt app startup)
export const initializeFirebase = async () => {
    const config = useRuntimeConfig();
    try {
        firebase.value = initializeApp(config.public.firebase);
        firestore.value = getFirestore(firebase.value); // Ensure Firestore is initialized
        // firestore.value = initializeFirestore(firebase.value, {
        //     localCache: persistentLocalCache({
        //         tabManager: persistentMultipleTabManager(),
        //     }),
        // });
        storage.value = getStorage(firebase.value);
        auth.value = getAuth(firebase.value);
        setPersistence(auth.value, browserSessionPersistence);
    } catch (error) {
        console.error("Firebase initialization error:", error);
        return;
    }

    // Connect to emulators
    if (import.meta.env.DEV) {
        connectAuthEmulator(auth.value, "http://127.0.0.1:9099");
        connectFirestoreEmulator(firestore.value, "127.0.0.1", 8080);
    }

    // Listen for auth
    auth.value.onAuthStateChanged((user) => {
        currentUser.value = user;
    });

    // Fetch site data
    // const siteSnapshot = await getDoc(
    //     doc(collection(firestore.value, "site"), "site"),
    // );
    // const siteData = siteSnapshot.data() as Site;
};
