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
    isAdmin: boolean;
}

interface Site {
    // Main image in Hero on homepage
    homeImage: string;
    // HTML for the banner on the homepage, empty to disable
    bannerHTML: string;
    // document ID (e.g. high-stakes-2425)
    currentSeason: string;
    // all uids that can access the admin panel
    admins: string[];
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

export const currentUser = ref<FirebaseUser | null>(null);
export const wasLoggedInLastTime = useLocalStorage<boolean>(
    "was-logged-in-at-some-point",
    false,
);
export const currentUserData = ref<User | null>(
    null,
);
export const site = ref<Site>({
    homeImage: "",
    bannerHTML: "",
    currentSeason: "",
    admins: [],
});

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
watch(currentUser, (user) => {
    if (user) {
    }
});

// TODO Use pagination
export const files = ref<{
    [name: string]: {
        path: string;
        uploaded: Date;
        url: string;
    };
}>({});
export const updateFiles = async (page: number = 1) => {
    if (!storage.value) throw new Error("Firebase Storage not initialized");
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
        const usersCollection = collection(firestore.value!, "users");
        const snapshot = await getDocs(usersCollection);
        users.value = snapshot.docs.map((doc) => {
            return {
                uid: doc.id,
                ...doc.data() as Omit<User, "uid">,
            };
        }) as User[];
        console.log("Users loaded:", users.value);
        return;
    }
    console.warn("Users already loaded, skipping update.");
}

export function userFromUID(uid: string) {
    if (uid === "") return null;
    const user = users.value.find((user) => user.uid === uid);
    if (!user) throw new Error(`WOAH, that user doesnt exist! (${uid})`);
    return user;
}

// TODO: speed up this function with parallel requests
export const seasons = ref<Season[]>([]);
export const currentSeason = computed(() => {
    console.log(
        "Current season:",
        seasons.value.find((season) =>
            season.id === site.value.currentSeason
        ) as Season,
    );
    return seasons.value.find((season) =>
        season.id === site.value.currentSeason
    ) as Season;
});

async function updateSeason(id: string) {
    // Fetch the season document and its team documents parallely
    const seasonReference = doc(firestore.value!, "seasons", id);
    const teamsReference = collection(seasonReference, "teams");
    const [seasonSnapshot, teamsDocs] = await Promise.all([
        getDoc(seasonReference),
        getDocs(teamsReference),
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

// If the current user is the captain of a team in the current season, this contains that team letter. null otherwise.
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

export const isCurrentPresident = computed(() => {
    return (!!currentUser.value && !!currentSeason.value?.officers.president) &&
        currentUser.value.uid === currentSeason.value.officers.president;
});

export const canAccessAdmin = computed(() => {
    return !!currentUser.value && !!currentSeason.value &&
        (isCurrentPresident.value || captainOfTeam.value !== null ||
            Object.values(currentSeason.value.officers).includes(
                currentUser.value.uid,
            ));
});

// CLIENT SIDE PLUGIN ONLY FUNCTION (ensures is only called once upon Nuxt app startup)
export const initializeFirebase = async () => {
    const config = useRuntimeConfig();
    try {
        firebase.value = initializeApp(config.public.firebase);
        firestore.value = getFirestore(firebase.value); // Ensure Firestore is initialized
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

    // Fetch site data
    const siteSnapshot = await getDoc(
        doc(collection(firestore.value, "site"), "site"),
    );
    if (!siteSnapshot.exists()) {
        console.warn("Site document not found, using default values.");
    } else {
        site.value = siteSnapshot.data() as Site;
    }
};
